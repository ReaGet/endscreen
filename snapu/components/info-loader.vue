<template>
  <div class="flex flex-col items-center gap-6 w-full max-w-[600px] m-auto">
    <div class="text-3xl text-black">{{message}}</div>
    <div class="flex justify-start h-2 w-full rounded-md bg-gray overflow-hidden">
      <div
        class="h-full bg-red transition-all"
        :style="{ 'width': progressWidth}"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from '~/store/channel';

const channelStore = useChannelStore();
const message = computed(() => {
  let step = channelStore.loading.step;
  let steps = channelStore.loading.steps;
  return `${step}/2 ${steps[step]}`;
});

const progressWidth = computed(() => {
  let step = channelStore.loading.step;
  let steps = channelStore.loading.steps;
  return `${step / 2 * 100}%`;
});
</script>