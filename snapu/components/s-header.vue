<template>
  <header class="sticky flex items-center justify-between px-6 py-4 top-0 bg-white z-50 border-b border-gray">
    <div class="flex items-center gap-8">
      <div class="w-20 h-20 rounded-full overflow-hidden">
        <a :href="channelLink" target="_blank">
          <img v-if="avatar.url" :src="avatar.url" width="50" height="50">
        </a>
      </div>
      <div class="hidden text-xl">
        <div>Views: {{ numberFormat(String(channelStore.info?.viewCount)) }}</div>
      </div>
    </div>

    <div>
      <form
        class="flex gap-4 w-[420px] h-14 text-xl"
        @submit.prevent="onSubmit"
      >
        <label
          class="relative flex items-center w-full px-4 bg-gray text-gray-dark rounded-[6px] overflow-hidden"
          for="channel"
        >
          <span class="z-10 select-none">https://youtube.com/</span>
          <input
            id="channel"
            class="absolute w-full h-full pl-[151px] pr-4 left-0 right-0 bg-gray text-black outline-none"
            type="text"
            placeholder="@channelId"
            v-model="channelId"
          >
        </label>
        <button class="flex items-center justify-center shrink-0 w-14 h-14 bg-black text-white rounded-[6px]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1629 13.1759L17.5 17.5M15 8.75C15 12.2017 12.2017 15 8.75 15C5.29822 15 2.5 12.2017 2.5 8.75C2.5 5.29822 5.29822 2.5 8.75 2.5C12.2017 2.5 15 5.29822 15 8.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form> 
    </div>
  </header>
</template>

<script setup lang="ts">
import { useChannelStore } from "~/store/channel";
import { numberFormat } from "@/mixins";

const router = useRouter();
const channelStore = useChannelStore();
const channelId = ref("");

const avatar = computed(() => {
  return channelStore.info?.avatar[0];
});

const channelLink = computed(() => {
  return `https://www.youtube.com/${channelStore.info?.channelId}`;
});

const onSubmit = () => {
  router.push({
    path: "channel",
    query: {
      id: channelId.value,
    },
  });
  setTimeout(() => location.reload(), 100)
};
</script>