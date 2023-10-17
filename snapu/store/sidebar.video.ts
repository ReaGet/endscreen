import { defineStore } from "pinia";
import { Video } from "~/types";

export const useVideoSidebarStore = defineStore("sidebarVideo", {
  state: () => ({
    video: null as Video | null,
  }),
}); 