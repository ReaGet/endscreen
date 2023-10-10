import { Http } from "./http.js";
import { Cache } from "../cache/index.js";

export class HttpCached {
  constructor() {
    this.cache = new Cache();
    this.http2 = new Http();
  }

  async post(url, partialOptions = {}, ignoreCaching = false) {
    const key = `${url}?${new URLSearchParams(partialOptions)}`;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const data = await this.http2.post(url, partialOptions);
    if (!ignoreCaching) {
      this.cache.set(key, data);
    }
    return data;
  }
}