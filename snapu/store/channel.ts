import { defineStore } from "pinia";
import { Channel, Video } from "~/types";
import { API_ENDPOINT } from "~/config";

export const useChannelStore = defineStore("channel", {
  state: () => ({
    loading: {
      done: false,
      step: 0,
      steps: [
        "parsing channel info",
        "parsing videos info",
        "parsing videos info",
      ]
    },
    info: null as Channel | null,
    videos: null as Video[] | null,
  }),

  actions: {
    async load(channelId: string) {
      this.loading.done = false;
      this.loading.step = 0;
      await this.loadChannelInfo(channelId);
      await this.loadVideosInfo(channelId);
    },
    async loadChannelInfo(channelId: string) {
      try {
        const response = await fetch(`http://${API_ENDPOINT}/channel/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: channelId }),
        });
        const data = await response.json();
        this.info = data.data;
        this.loading.step = 1;
      } catch(error) {
        console.log("Channel fetching error:", error);
      }
    },
    async loadVideosInfo(channelId: string) {
      try {
        const response = await fetch(`http://${API_ENDPOINT}/videos/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: channelId }),
        });
        const data = await response.json();
        this.videos = data.data;
        this.loading.step = 2;
        setTimeout(() => {
          this.loading.done = true;
        }, 300);
      } catch(error) {
        console.log("Channel fetching error:", error);
      }
    }
  },
});
