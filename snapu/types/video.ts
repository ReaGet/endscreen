import { Image } from "./image";

export type Video = {
  author: string,
  title: string,
  channelId: string,
  videoId: string,
  duration: number,
  thumbnail: Image,
  viewCount: number,
  endscreen: null | Video[],
  publish: object,
  upload: object,
};