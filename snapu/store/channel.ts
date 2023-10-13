import { defineStore } from "pinia";
import { Channel, Video } from "~/types";
import { API_ENDPOINT } from "~/config";

export const useChannelStore = defineStore("channel", {
  state: () => ({
    loaded: false,
    info: null as Channel | null,
    videos: null as Video[] | null,
  }),

  actions: {
    async loadInfo(channelId: string) {
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
      } catch(error) {
        console.log("Channel fetching error:", error);
      }
    },
  },
});
