<script setup lang="ts">
import { ExternalLinkIcon, StarIcon } from "lucide-vue-next";
import type { GithubRepo } from "~/types/Github";

defineProps<{
    starred: GithubRepo[];
}>();
</script>

<template>
    <div class="grid gap-4 w-full md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div
            v-for="star in starred"
            :key="star.id"
            class="flex flex-col gap-2 p-4 rounded-lg transition-all duration-300 outline outline-secondary hover:outline-neutral-700"
        >
            <a :href="star.html_url" class="flex justify-between items-start group/link" target="_blank">
                <div class="flex gap-2 items-center">
                    <NuxtImg class="rounded-full size-12 bg-neutral-900" :src="star.owner.avatar_url" />
                    <div class="flex flex-col leading-[1.05]">
                        <div
                            class="flex gap-1 items-center text-xl font-medium transition-all duration-300 max-w-50 truncate md:max-w-33 xl:max-w-50 group-hover/link:text-accent"
                        >
                            {{ star.name }}
                            <ExternalLinkIcon
                                class="transition-all duration-300 size-3.5 text-neutral-300 group-hover/link:text-accent"
                            />
                        </div>
                        <span class="text-neutral-500">{{ star.owner.login }}</span>
                    </div>
                </div>
                <div class="flex gap-1.5 items-center mt-1.5 text-sm text-neutral-300">
                    <StarIcon class="size-4 text-accent" />
                    <span>{{ star.stargazers_count }}</span>
                </div>
            </a>
            <a
                :href="star.homepage"
                class="text-sm transition-all duration-300 text-neutral-500 w-fit hover:text-neutral-300"
            >
                {{ star.homepage }}
            </a>
            <p class="text-neutral-300">{{ star.description }}</p>
        </div>
    </div>
</template>
