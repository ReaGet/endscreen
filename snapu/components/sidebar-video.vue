<template>
  <aside class="shrink-0 _w-96 w-[300px] min-h-screen border-l border-gray text-lg">
    <div class="p-6 border-b border-gray text-black">
      <span class="font-bold">Video Info</span>
    </div>
    <div class="flex flex-col gap-12 p-6">
      <div class="flex flex-col gap-2" v-if="video.title">
        <span class="font-bold">Title</span>
        <span class="text-gray-dark">{{ video.title }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="video.author && video.channelId">
        <span class="font-bold">Author</span>
        <a
          class="text-gray-dark underline hover:no-underline"
          :href="videoLink"
        >{{ video.author }}</a>
      </div>

      <div class="flex flex-col gap-2" v-if="video.viewCount">
        <span class="font-bold">View Count</span>
        <span class="text-gray-dark">{{ numberFormat(String(video.viewCount)) }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="video.duration">
        <span class="font-bold">Duration</span>
        <span class="text-gray-dark">{{ convertTime(video.duration) }}</span>
      </div>

      <div class="flex flex-col gap-2" v-if="video.endscreens">
        <span class="font-bold">Endscreens</span>
        <span class="text-gray-dark">{{ video.endscreens.length }}</span>
      </div>

      <div class="hidden _flex flex-col gap-2" v-if="video.upload.date">
        <span class="font-bold">Uploaded</span>
        <span class="flex items-center gap-2 text-gray-dark">
          <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11H9C9.39782 11 9.77936 10.842 10.0607 10.5607C10.342 10.2794 10.5 9.89782 10.5 9.5V3.5C10.5 3.23478 10.3946 2.98043 10.2071 2.79289C10.0196 2.60536 9.76522 2.5 9.5 2.5H8.5V1.5C8.5 1.36739 8.44732 1.24021 8.35355 1.14645C8.25979 1.05268 8.13261 1 8 1C7.86739 1 7.74021 1.05268 7.64645 1.14645C7.55268 1.24021 7.5 1.36739 7.5 1.5V2.5H4.5V1.5C4.5 1.36739 4.44732 1.24021 4.35355 1.14645C4.25979 1.05268 4.13261 1 4 1C3.86739 1 3.74021 1.05268 3.64645 1.14645C3.55268 1.24021 3.5 1.36739 3.5 1.5V2.5H2.5C2.23478 2.5 1.98043 2.60536 1.79289 2.79289C1.60536 2.98043 1.5 3.23478 1.5 3.5V9.5C1.5 9.89782 1.65804 10.2794 1.93934 10.5607C2.22064 10.842 2.60218 11 3 11ZM2.5 6.25C2.5 6.1837 2.52634 6.12011 2.57322 6.07322C2.62011 6.02634 2.6837 6 2.75 6H9.25C9.3163 6 9.37989 6.02634 9.42678 6.07322C9.47366 6.12011 9.5 6.1837 9.5 6.25V9.5C9.5 9.63261 9.44732 9.75979 9.35355 9.85355C9.25979 9.94732 9.13261 10 9 10H3C2.86739 10 2.74021 9.94732 2.64645 9.85355C2.55268 9.75979 2.5 9.63261 2.5 9.5V6.25Z" fill="#747474"/>
          </svg>
          {{ video.upload.date }}
        </span>
        <span class="flex items-center gap-2 text-gray-dark">
          <svg class="left-[1px]" width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 5C0 4.32667 0.133333 3.68 0.4 3.06C0.666667 2.44 1.02 1.90667 1.46 1.46C1.9 1.01333 2.43333 0.66 3.06 0.4C3.68667 0.14 4.33333 0.00666667 5 0C5.68 0 6.33 0.133333 6.95 0.4C7.57 0.666667 8.1 1.02 8.54 1.46C8.98 1.9 9.33333 2.43333 9.6 3.06C9.86667 3.68667 10 4.33333 10 5C10 5.68 9.86667 6.32667 9.6 6.94C9.33333 7.55333 8.98 8.08667 8.54 8.54C8.1 8.99333 7.56667 9.35 6.94 9.61C6.31333 9.87 5.66667 10 5 10C4.33333 10 3.68667 9.87 3.06 9.61C2.43333 9.35 1.9 8.99333 1.46 8.54C1.02 8.08667 0.666667 7.55333 0.4 6.94C0.133333 6.32667 0 5.68 0 5ZM1.25 5C1.25 5.68 1.41667 6.31 1.75 6.89C2.08333 7.47 2.54 7.92333 3.12 8.25C3.7 8.57667 4.32667 8.74333 5 8.75C5.67333 8.75667 6.3 8.59 6.88 8.25C7.46 7.91 7.91667 7.45667 8.25 6.89C8.58333 6.32333 8.75 5.69333 8.75 5C8.75 4.30667 8.58333 3.68 8.25 3.12C7.91667 2.56 7.46 2.10667 6.88 1.76C6.3 1.41333 5.67333 1.24333 5 1.25C4.32667 1.25667 3.7 1.42667 3.12 1.76C2.54 2.09333 2.08333 2.54667 1.75 3.12C1.41667 3.69333 1.25 4.32 1.25 5ZM4.38 5V3.13C4.38 2.95667 4.44 2.81 4.56 2.69C4.68 2.57 4.82667 2.50667 5 2.5C5.17333 2.49333 5.32 2.55667 5.44 2.69C5.56 2.82333 5.62333 2.97 5.63 3.13V4.38H6.88C7.04667 4.38 7.19333 4.44 7.32 4.56C7.44667 4.68 7.50667 4.82667 7.5 5C7.49333 5.17333 7.43333 5.32333 7.32 5.45C7.20667 5.57667 7.06 5.63667 6.88 5.63H5C4.82667 5.63 4.68 5.57 4.56 5.45C4.44 5.33 4.38 5.18 4.38 5Z"
              fill="#747474" />
          </svg>
          {{ video.upload.time }}
        </span>
      </div>

      <div class="flex flex-col gap-2" v-if="video.publish.date">
        <span class="font-bold">Published</span>
        <span class="flex items-center gap-2 text-gray-dark">
          <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11H9C9.39782 11 9.77936 10.842 10.0607 10.5607C10.342 10.2794 10.5 9.89782 10.5 9.5V3.5C10.5 3.23478 10.3946 2.98043 10.2071 2.79289C10.0196 2.60536 9.76522 2.5 9.5 2.5H8.5V1.5C8.5 1.36739 8.44732 1.24021 8.35355 1.14645C8.25979 1.05268 8.13261 1 8 1C7.86739 1 7.74021 1.05268 7.64645 1.14645C7.55268 1.24021 7.5 1.36739 7.5 1.5V2.5H4.5V1.5C4.5 1.36739 4.44732 1.24021 4.35355 1.14645C4.25979 1.05268 4.13261 1 4 1C3.86739 1 3.74021 1.05268 3.64645 1.14645C3.55268 1.24021 3.5 1.36739 3.5 1.5V2.5H2.5C2.23478 2.5 1.98043 2.60536 1.79289 2.79289C1.60536 2.98043 1.5 3.23478 1.5 3.5V9.5C1.5 9.89782 1.65804 10.2794 1.93934 10.5607C2.22064 10.842 2.60218 11 3 11ZM2.5 6.25C2.5 6.1837 2.52634 6.12011 2.57322 6.07322C2.62011 6.02634 2.6837 6 2.75 6H9.25C9.3163 6 9.37989 6.02634 9.42678 6.07322C9.47366 6.12011 9.5 6.1837 9.5 6.25V9.5C9.5 9.63261 9.44732 9.75979 9.35355 9.85355C9.25979 9.94732 9.13261 10 9 10H3C2.86739 10 2.74021 9.94732 2.64645 9.85355C2.55268 9.75979 2.5 9.63261 2.5 9.5V6.25Z" fill="#747474"/>
          </svg>
          {{ video.publish.date }}
        </span>
        <span class="flex items-center gap-2 text-gray-dark">
          <svg class="left-[1px]" width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 5C0 4.32667 0.133333 3.68 0.4 3.06C0.666667 2.44 1.02 1.90667 1.46 1.46C1.9 1.01333 2.43333 0.66 3.06 0.4C3.68667 0.14 4.33333 0.00666667 5 0C5.68 0 6.33 0.133333 6.95 0.4C7.57 0.666667 8.1 1.02 8.54 1.46C8.98 1.9 9.33333 2.43333 9.6 3.06C9.86667 3.68667 10 4.33333 10 5C10 5.68 9.86667 6.32667 9.6 6.94C9.33333 7.55333 8.98 8.08667 8.54 8.54C8.1 8.99333 7.56667 9.35 6.94 9.61C6.31333 9.87 5.66667 10 5 10C4.33333 10 3.68667 9.87 3.06 9.61C2.43333 9.35 1.9 8.99333 1.46 8.54C1.02 8.08667 0.666667 7.55333 0.4 6.94C0.133333 6.32667 0 5.68 0 5ZM1.25 5C1.25 5.68 1.41667 6.31 1.75 6.89C2.08333 7.47 2.54 7.92333 3.12 8.25C3.7 8.57667 4.32667 8.74333 5 8.75C5.67333 8.75667 6.3 8.59 6.88 8.25C7.46 7.91 7.91667 7.45667 8.25 6.89C8.58333 6.32333 8.75 5.69333 8.75 5C8.75 4.30667 8.58333 3.68 8.25 3.12C7.91667 2.56 7.46 2.10667 6.88 1.76C6.3 1.41333 5.67333 1.24333 5 1.25C4.32667 1.25667 3.7 1.42667 3.12 1.76C2.54 2.09333 2.08333 2.54667 1.75 3.12C1.41667 3.69333 1.25 4.32 1.25 5ZM4.38 5V3.13C4.38 2.95667 4.44 2.81 4.56 2.69C4.68 2.57 4.82667 2.50667 5 2.5C5.17333 2.49333 5.32 2.55667 5.44 2.69C5.56 2.82333 5.62333 2.97 5.63 3.13V4.38H6.88C7.04667 4.38 7.19333 4.44 7.32 4.56C7.44667 4.68 7.50667 4.82667 7.5 5C7.49333 5.17333 7.43333 5.32333 7.32 5.45C7.20667 5.57667 7.06 5.63667 6.88 5.63H5C4.82667 5.63 4.68 5.57 4.56 5.45C4.44 5.33 4.38 5.18 4.38 5Z"
              fill="#747474" />
          </svg>
          {{ video.publish.time }}
        </span>
      </div>
      
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Video } from '~/types';
import { numberFormat, convertTime } from '~/mixins';

const props = defineProps<{
  video: Video
}>();

const { video } = toRefs(props);

const videoLink = computed(() => {
  return `https://www.youtube.com/watch?v=${video.channelId}`;
});

</script>