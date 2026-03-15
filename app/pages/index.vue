<script setup lang="ts">
import { ArrowRightIcon, ExternalLinkIcon, StarIcon, User2Icon } from 'lucide-vue-next';

const userRef = ref('')
const nuxtApp = useNuxtApp()

const debouncedUser = useDebounce(userRef, 500)
const { data: starred, refresh, pending, error } = useAsyncData<any>(
    () => `github-stars-${debouncedUser.value}`,
    async () => {
        if (!debouncedUser.value.trim()) return []
        return await $fetch(`https://api.github.com/users/${debouncedUser.value}/starred`)
    },
    {
        watch: [debouncedUser],
        immediate: false,
        server: false,
        getCachedData: (key) => {
            const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
            if (!data) return
            return data
        }
    }
)
</script>

<template>
    <main class="flex flex-col gap-12 min-h-dvh pb-4 lg:pb-6 ">
        <section class="flex flex-col items-center justify-end gap-8 min-h-[55dvh]">
            <div class="text-center space-y-0.5">
                <div class="flex w-fit mx-auto items-center gap-2 font-semibold text-xl"
                    style="view-transition-name: logo-transition;">
                    <IconsFullLogo :scale="52" />
                </div>
                <h1 class="text-[clamp(2rem,4vw,3.3rem)] font-medium">Исследуй свой GitHub</h1>
                <p class="text-neutral-300 text-[clamp(0.75rem,2.5vw,1rem)]">
                    <!-- TODO: Добавить фильтрацию по звёздам и т.д -->
                    Введи пользователя и изучай его starred-репозитории
                </p>
            </div>
            <div class="relative group">
                <User2Icon
                    class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500 group-focus-within:text-neutral-300 duration-300 transition-colors" />
                <input v-model="userRef" @keydown.enter="() => refresh()"
                    class="py-3.5 px-12 outline-2 outline-secondary focus:outline-accent rounded-2xl text-neutral-200 placeholder:text-neutral-600 duration-300 transition-all"
                    placeholder="Ввведите никнейм" type="text">
                <button @click="() => refresh()"
                    class="absolute cursor-pointer right-2.5 top-1/2 -translate-y-1/2 rounded-xl p-1.5 bg-secondary origin-right duration-150 transition-all hover:bg-accent"
                    :class="!userRef ? 'opacity-0 scale-0' : 'opacity-100 scale-100'">
                    <ArrowRightIcon class="size-5 text-neutral-300" />
                </button>
            </div>
        </section>

        <!-- TODO: Добавить пагинацию по страницам либо кнопкой и т.п -->
        <ClientOnly>
            <section class="flex justify-center px-4">
                <div v-if="pending" class="mt-4 text-neutral-500 animate-pulse">Ищем звёзды...</div>
                <div v-else-if="error && userRef != ''"
                    class="text-red-400 bg-red-400/10 py-3 px-4 rounded-xl border border-red-400/20">
                    {{ error.statusCode === 404 ? 'Пользователь не найден' : 'Лимит API Github. Попробуйте через час' }}
                </div>

                <div v-else class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
                    <div v-for="star in starred" :key="star.id"
                        class="p-4 flex flex-col gap-2 outline outline-secondary rounded-lg hover:outline-neutral-700 duration-300 transition-all">
                        <a :href="star.owner.html_url" class="flex items-start justify-between group/link"
                            target="_blank">
                            <div class="flex items-center gap-2">
                                <NuxtImg class="size-12 rounded-full bg-neutral-900" :src="star.owner.avatar_url" />
                                <div class="flex flex-col leading-[1.05]">
                                    <div
                                        class="text-xl font-medium max-w-50 flex items-center gap-1 md:max-w-33 xl:max-w-50 truncate duration-300 transition-all group-hover/link:text-accent">
                                        {{ star.name }}
                                        <ExternalLinkIcon
                                            class="size-3.5 text-neutral-300 group-hover/link:text-accent duration-300 transition-all" />
                                    </div>
                                    <span class="text-neutral-500">{{ star.owner.login }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5 text-sm text-neutral-300 mt-1.5">
                                <StarIcon class="size-4 text-accent" />
                                <span>{{ star.stargazers_count }}</span>
                            </div>
                        </a>
                        <a :href="star.homepage"
                            class="text-sm text-neutral-500 w-fit hover:text-neutral-300 transition-all duration-300">
                            {{ star.homepage }}
                        </a>
                        <p class="text-neutral-300">{{ star.description }}</p>
                    </div>
                </div>
            </section>
        </ClientOnly>
    </main>
</template>