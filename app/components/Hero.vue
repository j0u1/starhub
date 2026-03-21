<script setup lang="ts">
import { User2Icon, ArrowRightIcon } from 'lucide-vue-next'

const userRef = defineModel<string>({ default: '' })

defineProps({
  search: {
    type: Function as PropType<() => void>,
    required: true,
  },
})
</script>

<template>
  <section class="flex min-h-[55dvh] flex-col items-center justify-end gap-8">
    <GithubLink />
    <div class="space-y-0.5 text-center">
      <div
        class="mx-auto flex w-fit items-center gap-2 text-xl font-semibold"
        style="view-transition-name: logo-transition"
      >
        <IconsFullLogo :scale="52" />
      </div>
      <h1 class="text-[clamp(2rem,4vw,3.3rem)] font-medium">
        Исследуй свой GitHub
      </h1>
      <p class="text-[clamp(0.75rem,2.5vw,1rem)] text-neutral-300">
        <!-- TODO: Добавить фильтрацию по звёздам и т.д -->
        Введи пользователя и изучай его starred-репозитории
      </p>
    </div>
    <div class="group relative">
      <User2Icon
        class="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-500 transition-colors duration-300 group-focus-within:text-neutral-300"
      />
      <input
        v-model="userRef"
        @keydown.enter="search"
        class="outline-secondary focus:outline-accent rounded-2xl px-12 py-3.5 text-neutral-200 outline-2 transition-all duration-300 placeholder:text-neutral-600"
        placeholder="Ввведите никнейм"
        type="text"
      />
      <button
        @click="search"
        class="bg-secondary hover:bg-accent absolute top-1/2 right-2.5 origin-right -translate-y-1/2 cursor-pointer rounded-xl p-1.5 transition-all duration-150"
        :class="!userRef ? 'scale-0 opacity-0' : 'scale-100 opacity-100'"
      >
        <ArrowRightIcon class="size-5 text-neutral-300" />
        <span class="sr-only">Поиск</span>
      </button>
    </div>
  </section>
</template>
