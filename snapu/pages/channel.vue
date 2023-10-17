<template>
  <s-header></s-header>
  <div class="flex max-h-[calc(100%-70px)]">
    <main
      class="scrollbar flex flex-col flex-1 pl-12 pr-2 pb-12"
      @click="selectedVideo = null"
    >
      <div class="flex gap-28 py-8 pl-20 text-lg text-gray-500">
        <div class="w-[250px]">Videos</div>
        <div>Endscreens</div>
      </div>

      <div class="scrollbar flex flex-col gap-20 pt-2 border-l-2 border-gray">
        <div
          v-for="v in channelStore.videos"
          :key="v.videoId"
          class="flex gap-28"
        >
          <div
            class="relative flex items-center gap-6 pl-20"
          >
            <div class="absolute w-16 h-1 rounded-md bg-gray left-0"
            ></div>
            <video-item
              :video="v"
              :selected="v.videoId === selectedVideo?.videoId"
              @select="handleClick"
            ></video-item>
            <div
              v-if="v.endscreens?.length"
              class="absolute w-16 h-1 rounded-md bg-gray -right-[55px]"
            ></div>
          </div>
          <video-item
            v-for="e in v.endscreens"
            :video="e"
            :external="channelStore.info?.externalId != e.channelId"
            :selected="e.videoId === selectedVideo?.videoId"
            @select="handleClick"
          ></video-item>
        </div>
      </div>
    </main>
    <sidebar-video
      v-if="selectedVideo"
      :video="selectedVideo"
    ></sidebar-video>
    <sidebar-channel v-else></sidebar-channel>
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from '~/store/channel';
import { Video } from "~/types";

useHead({
  title: `Channel`,
});

const channelStore = useChannelStore();
const selectedVideo = ref<Video|null>();

const handleClick = (video: Video) => {
  selectedVideo.value = video;
};
</script>