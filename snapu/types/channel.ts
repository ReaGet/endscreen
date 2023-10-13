import { Video } from "./video";
import { Image } from "./image";

export type Channel = {
  name: string,
  channelId: string,
  externalId: string,
  videoCount: number,
  viewCount: number,
  createdDate: string,
  video?: Video[],
  avatar?: Image | Image[],
  banner?: Image | Image[], 
  country?: string,
  description: string,
};