import { Client } from "../index.js";
import { ENDSCREEN_TYPES } from "../constants.js";

export class Parser {
  constructor() {
    this.client = new Client();
    this.continuation = null;
    this.endscreenAllow = [
      ENDSCREEN_TYPES.video,
    ]
    this.cache = {};
  }

  async getData(channelId) {
    const videoIds = await this.getVideosIds(channelId);
    const videos =  await this.getVideos(videoIds);
    return await Promise.all(videos.map(async (video) => {
      if (!video.endscreens) {
        return video;
      }
      return {
        ...video,
        endscreens: await this.getVideos(video.endscreens),
      };
    }));
  }

  async getVideos(ids) {
    const idsToParse = ids.filter((id) => !Object.keys(this.cache).includes(id));
    console.log(ids.length, idsToParse.length)
    const videos = await Promise.all(idsToParse.map((videoId) => {
      return this.client.getVideoInfo(videoId);
    }));

    return videos.map(({ videoDetails, endscreen }) => {
      const detials = this.parseDetails(videoDetails);
      const endscreens = endscreen ? this.getEndscreenIds(endscreen) : null;
      
      return {
        ...detials,
        endscreens
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

  parseDetails({ author, title, channelId, videoId, lengthSeconds, thumbnail, viewCount }) {
    return {
      author,
      title,
      channelId,
      videoId,
      duration: lengthSeconds,
      thumbnail: thumbnail.thumbnails[thumbnail.thumbnails.length - 1],
      viewCount,
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