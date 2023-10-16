<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="flex flex-col justify-center items-center gap-20">
      <h1 class="text-[3.6rem] leading-[3.6rem] text-center font-extrabold">
        <span class="text-red">Youtube</span> Channel Endscreens<br>See where traffic is going and etc.
      </h1>
      <form
        class="flex flex-col gap-6 w-[400px] text-[1.3rem]"
        @submit.prevent="onSubmit"
      >
        <label
          class="relative flex items-center w-full p-4 bg-gray text-gray-dark rounded-[6px] overflow-hidden"
          for="channel"
        >
          <span class="z-10 select-none">https://youtube.com/</span>
          <input
            id="channel"
            class="absolute w-full h-full pl-[157px] left-0 right-0 bg-gray text-black outline-none"
            type="text"
            placeholder="@channelId"
            v-model="channelId"
          >
        </label>
        <button class="w-full p-4 bg-black text-white rounded-[6px]">See channel</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

useHead({
  title: "Homepage",
});

const router = useRouter();

// const channelId = ref("@Lolkekovme");
let channelId = ref("UCsSsgPaZ2GSmO6il8Cb5iGA");

const onSubmit = () => {
  router.push({
    path: "channel",
    query: {
      id: channelId.value,
    },
  });
};
</script>
