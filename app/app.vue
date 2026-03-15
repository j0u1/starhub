<script setup lang="ts">
useSeoMeta({
    title: "StarHub",
    ogTitle: "StarHub",
    description: "StarHub платформа для просмотра звёзд конкретного пользователя на GitHub",
    ogDescription: "StarHub платформа для просмотра звёзд конкретного пользователя на GitHub",
    twitterCard: "summary_large_image",
});
</script>

<template>
    <div class="container flex flex-col px-4 mx-auto min-h-screen transition-all duration-300 lg:px-6 bg-bg">
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
</template>
