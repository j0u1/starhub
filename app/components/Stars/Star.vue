<script setup lang="ts">
import { ExternalLinkIcon, StarIcon } from 'lucide-vue-next'
import type { GithubRepo } from '~/types/Github'

defineProps<{
  starred: GithubRepo[]
}>()
</script>

<template>
  <div class="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <div
      v-for="star in starred"
      :key="star.id"
      class="outline-secondary flex flex-col gap-2 rounded-lg p-4 outline transition-all duration-300 hover:outline-neutral-700"
    >
      <a
        :href="star.html_url"
        class="group/link flex items-start justify-between"
        target="_blank"
      >
        <div class="flex items-center gap-2">
          <NuxtImg
            class="size-12 rounded-full bg-neutral-900"
            :src="star.owner.avatar_url"
          />
          <div class="flex flex-col leading-[1.05]">
            <div
              class="group-hover/link:text-accent flex max-w-50 items-center gap-1 truncate text-xl font-medium transition-all duration-300 md:max-w-33 xl:max-w-50"
            >
              {{ star.name }}
              <ExternalLinkIcon
                class="group-hover/link:text-accent size-3.5 text-neutral-300 transition-all duration-300"
              />
            </div>
            <span class="text-neutral-500">{{ star.owner.login }}</span>
          </div>
        </div>
        <div class="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-300">
          <StarIcon class="text-accent size-4" />
          <span>{{ star.stargazers_count }}</span>
        </div>
      </a>
      <a
        :href="star.homepage"
        class="w-fit text-sm text-neutral-500 transition-all duration-300 hover:text-neutral-300"
      >
        {{ star.homepage }}
      </a>
      <p class="text-neutral-300">{{ star.description }}</p>
    </div>
  </div>
</template>
