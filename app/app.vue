<script setup lang="ts">
useSeoMeta({
    title: "StarHub",
    ogTitle: "StarHub",
    description:
        "StarHub платформа для просмотра звёзд конкретного пользователя на GitHub",
    ogDescription:
        "StarHub платформа для просмотра звёзд конкретного пользователя на GitHub",
    twitterCard: "summary_large_image",
});
</script>

<template>
    <div class="min-h-screen flex flex-col bg-bg container mx-auto px-4 lg:px-6 duration-300 transition-all">
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
</template>
