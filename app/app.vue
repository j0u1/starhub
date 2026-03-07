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
    <div class="min-h-screen flex flex-col bg-bg container mx-auto">
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
</template>
