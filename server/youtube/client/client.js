import { HttpCached, Http } from "../http/index.js";
import { TAB_TYPE_PARAMS, I_END_POINT } from "../constants.js";
import { getContinuation, parseTabData } from "../utils/index.js";

export class Client {
  constructor() {
    this.http = new HttpCached();
  }

  async getChannelInfo(channelId) {
    const params = {
      params: TAB_TYPE_PARAMS.about,
    }
    
    const response = await this.http.post(`${I_END_POINT}/browse`, {
      browseId: channelId,
      ...params,
    }, true);
    
    return {
      about: parseTabData("about", response),
      header: response.header
    };
  }

  async getVideoInfo(videoId) {
    const { videoDetails, endscreen, microformat } = await this.http.post(`${I_END_POINT}/player`, {
      videoId,
    });
    return { videoDetails, endscreen, microformat };
  }

  async getChannelVideos(channelId, options) {
    const params = {
      params: TAB_TYPE_PARAMS.videos,
      ...options,
    }

    const response = await this.http.post(`${I_END_POINT}/browse`, {
      browseId: channelId,
      ...params,
    }, true);

    const data = parseTabData("videos", response);
    const continuation = getContinuation(data);

    return {
      continuation,
      items: data.filter((item) => !item.continuationItemRenderer)
            .map(({ videoRenderer  }) => videoRenderer.videoId),
    };
  }
}