<template>
  <InfoLoader v-if="!channelStore.loading.done"></InfoLoader>
  <div v-else>
    <header class="flex items-center justify-between px-6 py-4 border-b border-gray">
      <div class="flex items-center gap-8">
        <div class="w-20 h-20 rounded-full overflow-hidden">
          <a :href="channelLink" target="_blank">
            <img v-if="avatar.url" :src="avatar.url" width="50" height="50">
          </a>
        </div>
        <div class="hidden text-xl">
          <div>Views: {{ numberFormat(channelStore.info?.viewCount) }}</div>
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
    <div class="flex">
      <main class="flex flex-col flex-1 gap-20 px-12 py-20">
        <v-video
          v-for="v in channelStore.videos"
          :key="v.videoId"
          :video="v"
        ></v-video>
      </main>
      <aside class="shrink-0 w-96 min-h-screen border-l border-gray text-lg">
        <div class="p-6 border-b border-gray text-black">
          <span class="font-bold">Info</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from '~/store/channel';

useHead({
  title: `Channel`,
});

const router = useRouter();
const route = useRoute();
const channelStore = useChannelStore();

const expandDescription = ref(false);

let channelId = ref("");

const onSubmit = () => {
  router.push({
    path: "channel",
    query: {
      id: channelId.value,
    },
  });
  setTimeout(() => location.reload(), 100)
};

const { id } = route.query;
channelStore.load(id);

const avatar = computed(() => {
  return channelStore.info?.avatar[0];
});

const channelLink = computed(() => {
  return `https://www.youtube.com/${channelStore.info?.channelId}`;
});

const numberFormat = (n: string) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
</script>