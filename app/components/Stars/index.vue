<script setup lang="ts">
import Error from './Error.vue'
import Loading from './Loading.vue'
import Star from './Star.vue'
import type { GithubRepo } from '~/types/Github'

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object,
    default: null,
  },
  starred: {
    type: Array as () => GithubRepo[],
    default: () => [],
  },
  userRef: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <ClientOnly>
    <section class="flex justify-center px-4">
      <Loading v-if="pending" />
      <Error v-else-if="error" />
      <Star v-else-if="starred?.length > 0" :starred="starred" />
    </section>
  </ClientOnly>
</template>
