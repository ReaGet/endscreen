<template>
  <aside class="shrink-0 _w-96 w-[300px] min-h-screen border-l border-gray text-lg">
    <div class="p-6 border-b border-gray text-black">
      <span class="font-bold">Channel Info</span>
    </div>
    <div class="flex flex-col gap-12 p-6">
      <div class="flex flex-col gap-2" v-if="channelStore.info?.name">
        <span class="font-bold">Name</span>
        <span class="text-gray-dark">{{ channelStore.info?.name }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="channelStore.info?.description">
        <span class="font-bold">Description</span>
        <span
          @click="expandDescription = !expandDescription"
          class="text-gray-dark break-all cursor-pointer"
          :class="{'line-clamp-6': !expandDescription}"
        >{{ channelStore.info?.description }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="channelStore.info?.videoCount">
        <span class="font-bold">Video Count</span>
        <span class="text-gray-dark line-clamp-6">{{ channelStore.info?.videoCount }}</span>
      </div>
      
      <div class="flex flex-col gap-2" v-if="channelStore.info?.viewCount">
        <span class="font-bold">Views</span>
        <span class="text-gray-dark line-clamp-6">{{ numberFormat(channelStore.info?.viewCount.toString()) }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="channelStore.info?.country">
        <span class="font-bold">Country</span>
        <span class="text-gray-dark line-clamp-6">{{ channelStore.info?.country }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="channelStore.info?.createdDate">
        <span class="font-bold">Created date</span>
        <span class="text-gray-dark line-clamp-6">{{ channelStore.info?.createdDate }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { numberFormat } from '~/mixins';
import { useChannelStore } from '~/store/channel';

const channelStore = useChannelStore();
const expandDescription = ref(false);
</script>