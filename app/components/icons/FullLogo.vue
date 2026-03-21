<script setup lang="ts">
const props = defineProps<{
  scale?: number
}>()
</script>

<template>
  <IconsLogo
    :style="{ width: (scale ?? 8) + 'px', height: (scale ?? 8) + 'px' }"
  />
  <span>StarHub</span>
</template>
