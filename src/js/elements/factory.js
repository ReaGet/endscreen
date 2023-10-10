import { Video } from "./video.js";

export const createVideo = (data, index) => {
  // console.log(data.endscreens)
  const video = new Video(data);
  video.x = index;

  if (data?.endscreens && data.endscreens.length) {
    video.endscreens = video.endscreens.map((endscreen, index2) => {
      const endscreenVideo = new Video(endscreen);
      endscreenVideo.x = index;
      endscreenVideo.y = index2 + 1;
      endscreenVideo.type = "endscreen";

      return endscreenVideo;
    });
  }

  return video;
};