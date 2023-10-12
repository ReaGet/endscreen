import { Video } from "./video";
import { Image } from "./image";

export type Channel = {
  name: string,
  channelId: string,
  externalId: string,
  viewsCount: number,
  createdDate: Date,
  video: Video[],
  avatar: Image | Image[],
  banner?: Image | Image[], 
};