<script setup lang="ts">
import { User2Icon, ArrowRightIcon } from "lucide-vue-next";

const userRef = defineModel<string>({ default: "" });

defineProps({
    search: {
        type: Function as PropType<() => void>,
        required: true,
    },
});
</script>

<template>
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
                @keydown.enter="search"
                class="py-3.5 px-12 rounded-2xl transition-all duration-300 outline-2 outline-secondary text-neutral-200 placeholder:text-neutral-600 focus:outline-accent"
                placeholder="Ввведите никнейм"
                type="text"
            />
            <button
                @click="search"
                class="absolute right-2.5 top-1/2 p-1.5 rounded-xl transition-all duration-150 origin-right -translate-y-1/2 cursor-pointer bg-secondary hover:bg-accent"
                :class="!userRef ? 'opacity-0 scale-0' : 'opacity-100 scale-100'"
            >
                <ArrowRightIcon class="size-5 text-neutral-300" />
                <span class="sr-only">Поиск</span>
            </button>
        </div>
    </section>
</template>
