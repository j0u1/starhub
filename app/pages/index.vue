<script setup lang="ts">
import Hero from "~/components/Hero.vue";

const userRef = ref("");
const lastUserRef = ref("");
const nuxtApp = useNuxtApp();

const debouncedUser = useDebounce(userRef, 500);
const {
    data: starred,
    refresh,
    pending,
    error,
    clear,
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

const handleSearch = () => {
    if (!userRef.value.trim()) return;

    clear();
    refresh();
};

watch(debouncedUser, (newValue) => {
    if (newValue) {
        clear();
    }
});
</script>

<template>
    <main class="flex flex-col gap-12 pb-4 lg:pb-6 min-h-dvh">
        <Hero v-model="userRef" :search="handleSearch" />

        <Stars :starred="starred" :userRef="userRef" :error="error" :pending="pending" />
    </main>
</template>
