import { Image } from "./image";

export type Video = {
  author: string,
  title: string,
  channelId: string,
  videoId: string,
  duration: number,
  thumbnail: Image,
  viewCount: number,
  endscreens: null | Video[],
  publish: {
    date: string,
    time: string,
  },
  upload: {
    date: string,
    time: string,
  },
};