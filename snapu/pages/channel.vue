<template>
  <div v-if="!channelStore.loaded">Loading</div>
  <div v-else>Done</div>
</template>

<script setup lang="ts">
import { useChannelStore } from '~/store/channel';

const route = useRoute();
const channelStore = useChannelStore();

const { id } = route.query;
console.log(id)

channelStore.loadInfo(id)
// channelStore.load()
// setTimeout(() => {
//   channelStore.$patch((state) => {
//     state.loaded = true;
//   });
// }, 1000)
</script>