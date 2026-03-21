<script setup lang="ts">
useSeoMeta({
  title: 'StarHub',
  ogTitle: 'StarHub',
  description:
    'StarHub платформа для просмотра звёзд конкретного пользователя на GitHub',
  ogDescription:
    'StarHub платформа для просмотра звёзд конкретного пользователя на GitHub',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div
    class="bg-bg container mx-auto flex min-h-screen flex-col px-4 transition-all duration-300 lg:px-6"
  >
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
