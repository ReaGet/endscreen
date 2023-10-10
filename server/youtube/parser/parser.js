import { Client } from "../index.js";
import { ENDSCREEN_TYPES } from "../constants.js";
import { dateFormatter } from "../utils/index.js";

export class Parser {
  constructor() {
    this.client = new Client();
    this.continuation = null;
    this.endscreenAllow = [
      ENDSCREEN_TYPES.video,
    ]
    this.videosCount = 0;
  }

  async getData(channelId) {
    const videoIds = await this.getVideosIds(channelId);
    const videos =  await this.getVideos(videoIds);
    const result = await Promise.all(videos.map(async (video) => {
      if (!video.endscreens) {
        return video;
      }
      return {
        ...video,
        endscreens: await this.getVideos(video.endscreens),
      };
    }));

    return result;
  }

  async getVideos(ids) {
    this.videosCount += ids.length;
    const videos = await Promise.all(ids.map((videoId) => {
      return this.client.getVideoInfo(videoId);
    }));

    return videos.map((video) => {
      const { videoDetails, endscreen, microformat } = video;
      const videoInfo = this.parseDetails(videoDetails, microformat);
      const endscreenIds = endscreen ? this.getEndscreenIds(endscreen) : null;
      
      return {
        ...videoInfo,
        endscreens: endscreenIds,
      }
    });
  }

  async getVideosIds(channelId, ids = [], options = {}) {
    const response = await this.client.getChannelVideos(channelId, options);
    this.continuation = response.continuation;
    ids.push(...response.items);

    if (this.hasContinuation()) {
      return await this.getVideosIds(channelId, ids, {
        continuation: this.continuation
      });
    }

    return ids;
  }

  parseDetails(
    { author, title, channelId, videoId, lengthSeconds, thumbnail, viewCount },
    { playerMicroformatRenderer: { uploadDate, publishDate } }
  ) {
    return {
      author,
      title,
      channelId,
      videoId,
      duration: lengthSeconds,
      thumbnail: thumbnail.thumbnails[thumbnail.thumbnails.length - 1],
      viewCount,
      publish: {
        date: dateFormatter(publishDate, "date"),
        time: dateFormatter(publishDate, "time"),
      },
      upload: {
        date: dateFormatter(uploadDate, "date"),
        time: dateFormatter(uploadDate, "time"),
      },
    };
  }

  getEndscreenIds({ endscreenRenderer }) {
    return endscreenRenderer.elements
      .filter(({ endscreenElementRenderer: { style } }) => this.endscreenAllow.includes(style))
      .map((item) => item["endscreenElementRenderer"])
      .map(({ endpoint }) => {
        return endpoint.watchEndpoint.videoId;
      });
  }

  hasContinuation() {
    return !!this.continuation;
  }
}