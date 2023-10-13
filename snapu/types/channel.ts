import { Video } from "./video";
import { Image } from "./image";

export type Channel = {
  name: string,
  country?: string,
  channelId: string,
  externalId: string,
  viewCount: number,
  createdDate: Date,
  video: Video[],
  avatar: Image | Image[],
  banner?: Image | Image[], 
};