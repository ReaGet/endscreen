<template>
  <div v-if="!channelStore.loaded">Loading</div>
  <div v-else>
    Done
    <p>Name: {{ channelStore.info?.name }}</p>
    <p>channelId: {{ channelStore.info?.channelId }}</p>
    <p>externalId: {{ channelStore.info?.externalId }}</p>
    <p>videoCount: {{ channelStore.info?.videoCount }}</p>
    <p>viewCount: {{ channelStore.info?.viewCount }}</p>
    <p>createdDate: {{ channelStore.info?.createdDate }}</p>
    <p>country: {{ channelStore.info?.country }}</p>
    <p>description: {{ channelStore.info?.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from '~/store/channel';

const route = useRoute();
const channelStore = useChannelStore();

const { id } = route.query;
channelStore.loadInfo(id)
// channelStore.load()
// setTimeout(() => {
//   channelStore.$patch((state) => {
//     state.loaded = true;
//   });
// }, 1000)
</script>