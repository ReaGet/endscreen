<template>
  <div class="flex flex-col w-[250px]">
    <div class="flex justify-between">
      <span>{{ video.publish?.date }}</span>
      <span>{{ video.publish?.time }}</span>
    </div>
    <div class="relative w-full h-56 rounded-md overflow-hidden bg-gray hover:shadow-lg">
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
import { Video } from '~/types';
const props = defineProps<{
  video: Video,
}>();
const { video } = props;

const videoLink = computed(() => {
  return `https://www.youtube.com/watch?v=${video.videoId}`;
});

const convertTime = (totalSeconds: number) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  
  return (/0{1,2}/g.test(hours) !== true ? hours + ":" : "") + minutes + ":" + seconds;
};
</script>