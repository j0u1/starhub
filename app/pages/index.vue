<script setup lang="ts">
import { ArrowRightIcon, Users2Icon } from 'lucide-vue-next';


const userRef = ref('')
</script>

<template>
  <section class="min-h-dvh flex flex-col items-center justify-center gap-8">
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
    <div
      class="relative group">
      <Users2Icon
        class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500 group-focus-within:text-accent duration-300 transition-colors" />
      <input
        v-model="userRef"
        class="py-3.5 px-12 w-80 bg-secondary/20 outline-2 outline-secondary focus:outline-accent rounded-2xl text-neutral-200 placeholder:text-neutral-600 duration-300 transition-all"
        type="text">
      <div
        class="absolute right-2.5 top-1/2 -translate-y-1/2  rounded-xl p-1.5 bg-secondary origin-right duration-150 transition-all"
        :class="`${!userRef ? 'pointer-events-none' : 'pointer-events-auto'}`"
        :style="{scale: !userRef ? 0 : 1}"
      >
        <ArrowRightIcon class="size-5" />
      </div>
    </div>
  </section>
</template>