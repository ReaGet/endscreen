<template>
  <div
    class="flex flex-col shrink-0 w-[250px] rounded-md hover:bg-cyan-100 hover:ring-4 ring-cyan-100"
    :class="{
      'bg-red-200 ring-4 ring-red-200': external,
      'bg-cyan-300 ring-4 ring-cyan-300': selected,
    }"
  >
    <div class="flex justify-between px-2">
      <span>{{ video.publish?.date }}</span>
      <span>{{ video.publish?.time }}</span>
    </div>
    <div
      class="relative w-full h-56 rounded-md overflow-hidden bg-gray"
      @click.stop="$emit('select', video)"
    >
      <img
        v-if="video.thumbnail?.url"
        :src="video.thumbnail?.url"
        alt=""
      >
      <div class="absolute w-full h-20 top-0 bg-gradient-to-b from-black to-transparent"></div>
      <div class="absolute w-full h-20 bottom-0 bg-gradient-to-t from-black to-transparent"></div>
      <div class="absolute top-4 left-4 right-4 text-xl text-white z-10">
        <a :href="videoLink" target="_blank">{{ video.title }}</a>
      </div>
      <div class="absolute p-2 bottom-2 right-2 text-base text-white rounded-md bg-black z-10">{{ convertTime(video.duration) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertTime } from "@/mixins";
import { Video } from '~/types';
const props = defineProps<{
  video: Video,
  external?: boolean,
  selected: boolean,
}>();
const { video } = props;

const videoLink = computed(() => {
  return `https://www.youtube.com/watch?v=${video.videoId}`;
});
</script>