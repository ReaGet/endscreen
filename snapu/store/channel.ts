import { defineStore } from "pinia";

export const useChannelStore = defineStore("channel", {
  state: () => ({
    loaded: false,
    
  }),

  actions: {
    async loadInfo() {

    },
  },
});
