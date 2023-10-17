<template>
  <div v-if="!channelStore.loading.done" class="flex flex-col w-full h-screen">
    <InfoLoader></InfoLoader>
  </div>
  <div v-else class="flex flex-col w-full h-screen overflow-hidden">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from '~/store/channel';

const router = useRouter();
const route = useRoute();
const channelStore = useChannelStore();

setTimeout(() => {
  const { id } = route.query;
  
  if (!id) {
    router.push({
      path: "/",
    });
  }
  channelStore.load(id);
}, 0);
</script>