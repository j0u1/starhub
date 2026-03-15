<script setup lang="ts">
import { ArrowRightIcon, ExternalLinkIcon, StarIcon, User2Icon } from "lucide-vue-next";

const userRef = ref("");
const nuxtApp = useNuxtApp();

const debouncedUser = useDebounce(userRef, 500);
const {
    data: starred,
    refresh,
    pending,
    error,
} = useAsyncData<any>(
    () => `github-stars-${debouncedUser.value}`,
    async () => {
        if (!debouncedUser.value.trim()) return [];
        return await $fetch(`https://api.github.com/users/${debouncedUser.value}/starred`);
    },
    {
        watch: [debouncedUser],
        immediate: false,
        server: false,
        getCachedData: (key) => {
            const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            if (!data) return;
            return data;
        },
    },
);
</script>

<template>
    <main class="flex flex-col gap-12 pb-4 lg:pb-6 min-h-dvh">
        <section class="flex flex-col gap-8 justify-end items-center min-h-[55dvh]">
            <div class="space-y-0.5 text-center">
                <div
                    class="flex gap-2 items-center mx-auto text-xl font-semibold w-fit"
                    style="view-transition-name: logo-transition"
                >
                    <IconsFullLogo :scale="52" />
                </div>
                <h1 class="font-medium text-[clamp(2rem,4vw,3.3rem)]">Исследуй свой GitHub</h1>
                <p class="text-neutral-300 text-[clamp(0.75rem,2.5vw,1rem)]">
                    <!-- TODO: Добавить фильтрацию по звёздам и т.д -->
                    Введи пользователя и изучай его starred-репозитории
                </p>
            </div>
            <div class="relative group">
                <User2Icon
                    class="absolute left-4 top-1/2 transition-colors duration-300 -translate-y-1/2 size-5 text-neutral-500 group-focus-within:text-neutral-300"
                />
                <input
                    v-model="userRef"
                    @keydown.enter="() => refresh()"
                    class="py-3.5 px-12 rounded-2xl transition-all duration-300 outline-2 outline-secondary text-neutral-200 placeholder:text-neutral-600 focus:outline-accent"
                    placeholder="Ввведите никнейм"
                    type="text"
                />
                <button
                    @click="() => refresh()"
                    class="absolute right-2.5 top-1/2 p-1.5 rounded-xl transition-all duration-150 origin-right -translate-y-1/2 cursor-pointer bg-secondary hover:bg-accent"
                    :class="!userRef ? 'opacity-0 scale-0' : 'opacity-100 scale-100'"
                >
                    <ArrowRightIcon class="size-5 text-neutral-300" />
                </button>
            </div>
        </section>

        <!-- TODO: Добавить пагинацию по страницам либо кнопкой и т.п -->
        <ClientOnly>
            <section class="flex justify-center px-4">
                <div v-if="pending" class="mt-4 animate-pulse text-neutral-500">Ищем звёзды...</div>
                <div
                    v-else-if="error && userRef != ''"
                    class="py-3 px-4 text-red-400 rounded-xl border bg-red-400/10 border-red-400/20"
                >
                    {{ error.statusCode === 404 ? "Пользователь не найден" : "Лимит API Github. Попробуйте через час" }}
                </div>

                <div v-else class="grid gap-4 w-full md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <div
                        v-for="star in starred"
                        :key="star.id"
                        class="flex flex-col gap-2 p-4 rounded-lg transition-all duration-300 outline outline-secondary hover:outline-neutral-700"
                    >
                        <a
                            :href="star.owner.html_url"
                            class="flex justify-between items-start group/link"
                            target="_blank"
                        >
                            <div class="flex gap-2 items-center">
                                <NuxtImg class="rounded-full size-12 bg-neutral-900" :src="star.owner.avatar_url" />
                                <div class="flex flex-col leading-[1.05]">
                                    <div
                                        class="flex gap-1 items-center text-xl font-medium transition-all duration-300 max-w-50 truncate md:max-w-33 xl:max-w-50 group-hover/link:text-accent"
                                    >
                                        {{ star.name }}
                                        <ExternalLinkIcon
                                            class="transition-all duration-300 size-3.5 text-neutral-300 group-hover/link:text-accent"
                                        />
                                    </div>
                                    <span class="text-neutral-500">{{ star.owner.login }}</span>
                                </div>
                            </div>
                            <div class="flex gap-1.5 items-center mt-1.5 text-sm text-neutral-300">
                                <StarIcon class="size-4 text-accent" />
                                <span>{{ star.stargazers_count }}</span>
                            </div>
                        </a>
                        <a
                            :href="star.homepage"
                            class="text-sm transition-all duration-300 text-neutral-500 w-fit hover:text-neutral-300"
                        >
                            {{ star.homepage }}
                        </a>
                        <p class="text-neutral-300">{{ star.description }}</p>
                    </div>
                </div>
            </section>
        </ClientOnly>
    </main>
</template>
