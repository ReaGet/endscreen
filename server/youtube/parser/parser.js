import { Client } from "../index.js";

export class Parser {
  constructor() {
    this.client = new Client();
    this.continuation = null;
    this.videoIds = [];
  }

  async getVideos(channelId) {
    await this.getVideosIds(channelId);
    const videos = await Promise.all(this.videoIds.map((videoId) => {
      return this.client.getVideoInfo(videoId);
    }));

    return videos.map(({ videoDetails, endscreen }) => {
      const detials = this.parseDetails(videoDetails);
      
      return {
        detials,
        endscreen,
        endscreen: endscreen ? this.parseEndscreen(endscreen) : null,
      }
    });
  }

  hasContinuation() {
    return !!this.continuation;
  }

  async getVideosIds(channelId, options) {
    const response = await this.client.getChannelVideos(channelId, options);
    this.continuation = response.continuation;
    this.videoIds.push(...response.items);

    if (this.hasContinuation()) {
      return await this.getVideosIds(channelId, {
        continuation: this.continuation
      });
    }

    return this.videoIds;
  }

  parseDetails({ author, channelId, lengthSeconds, title, thumbnail }) {
    return {
      channelId,
      title,
      duration: lengthSeconds,
      thumbnail: thumbnail.thumbnails[thumbnail.thumbnails.length - 1],
      author,
    };
  }

  parseEndscreen({ endscreenRenderer }) {
    return endscreenRenderer.elements
      .filter(({ endscreenElementRenderer }) => endscreenElementRenderer !== "CHANNEL")
      .map((item) => item["endscreenElementRenderer"])
      .map(({ title }) => {
        return {
          title: title.simpleText,
          d: endscreenRenderer
        }
      });
  }
}