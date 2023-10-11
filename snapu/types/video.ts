import { Thumbnail } from "./thumbnail";

export type Video = {
  author: String,
  title: String,
  channelId: String,
  videoId: String,
  duration: Number,
  thumbnail: Thumbnail,
  viewCount: Number,
  endscreen: Array<Video>,
  publish: Date,
  upload: Date,
};