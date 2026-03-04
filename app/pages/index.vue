<script setup lang="ts">
import { ArrowRightIcon, User2Icon } from 'lucide-vue-next';

const userRef = ref('')
const nuxtApp = useNuxtApp()

const { data: starred, refresh, pending, error } = useAsyncData<any>(
  `github-stars-${userRef.value}`,
  () =>
    $fetch(`https://api.github.com/users/${userRef.value}/starred`),
  {
    watch: [userRef],
    immediate: false,
    server: false,
    getCachedData: (key) => {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      if (!data) return
      return data
    }
  }
)

const handleSearch = () => {
  if (userRef.value.trim()) {
    refresh()
  }
}
</script>

<template>
  <main class="flex flex-col gap-12 min-h-dvh">
    <section class="flex flex-col items-center justify-end gap-8 min-h-[55dvh]">
      <div class="text-center space-y-0.5">
        <div class="flex w-fit mx-auto items-center gap-2 font-semibold text-xl"
          style="view-transition-name: logo-transition;">
          <IconsFullLogo :scale="52" />
        </div>
        <h1 class="text-[clamp(2rem,4vw,3.3rem)] font-medium">Исследуй свой GitHub</h1>
        <p class="text-neutral-300 text-[clamp(0.75rem,2.5vw,1rem)]">
          Введи пользователя и изучай его starred-репозитории с фильтрацией
        </p>
      </div>
      <div class="relative group">
        <User2Icon
          class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500 group-focus-within:text-neutral-300 duration-300 transition-colors" />
        <input v-model="userRef" @keydown.enter="() => refresh"
          class="py-3.5 px-12 outline-2 outline-secondary focus:outline-accent rounded-2xl text-neutral-200 placeholder:text-neutral-600 duration-300 transition-all"
          placeholder="Ввведите никнейм" type="text">
        <button @click="handleSearch"
          class="absolute cursor-pointer right-2.5 top-1/2 -translate-y-1/2 rounded-xl p-1.5 bg-secondary origin-right duration-150 transition-all hover:bg-accent"
          :class="!userRef ? 'opacity-0 scale-0' : 'opacity-100 scale-100'">
          <ArrowRightIcon class="size-5 text-neutral-300" />
        </button>
      </div>
    </section>

    <section class="flex justify-center">
      <div v-if="pending" class="mt-4 text-neutral-500 animate-pulse">Ищем звёзды...</div>
      <div v-else-if="error && userRef != ''"
        class="text-red-400 bg-red-400/10 py-3 px-4 rounded-xl border border-red-400/20">
        {{ error.statusCode === 404 ? 'Пользователь не найден' : 'Лимит API Github. Попробуйте через час' }}
      </div>
      <div v-else class="grid grid-cols-4 gap-4 w-full">
        <div v-for="star in starred" :key="star.id" class="p-4 outline outline-secondary rounded-lg">
          {{ star.name }}
        </div>
      </div>
    </section>
  </main>
</template>