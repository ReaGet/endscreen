import fetch from "node-fetch";
import { BASE_URL, INNERTUBE_API_KEY, INNERTUBE_CLIENT_NAME, INNERTUBE_CLIENT_VERSION } from "../constants.js";

export class Http {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async post(url, partialOptions = {}) {
    const headers = {
      referer: "https://www.youtube.com/",
      accept: "*/*",
      "x-youtube-client-name": "1",
      "x-youtube-client-version": INNERTUBE_CLIENT_VERSION,
      "content-type": "application/json",
      "accept-encoding": "gzip, deflate, br",
    };

    const body = {
      ...partialOptions,
      context: {
        client: {
          hl: "en",
          gl: "US",
          clientName: INNERTUBE_CLIENT_NAME,
          clientVersion: INNERTUBE_CLIENT_VERSION,
        }
      }
    }

    const params = {
      key: INNERTUBE_API_KEY,
      prettyPrint: "false",
    }

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }

    const finalUrl = `https://${this.baseUrl}${url}?${new URLSearchParams(params)}`;

    // console.log(1, finalUrl, options)
    
    const response = await fetch(finalUrl, options);
    return await response.json();
  }
  
}