import { convertTime } from "../utils/index.js";

export class Video {
  constructor(data) {
    Object.assign(this, data);
    this.x = 0;
    this.y = 0;
  }

  toString() {
    return `
      <article class="video" style="left: ${this.x * (250 + 50)}px; top: ${this.y * (250 + 50)}px">
        <div class="video__img">
          <img src="${this.thumbnail.url}" alt="" width="250" height="140">
          <div class="video__duration">${convertTime(this.duration)}</div>
        </div>
        <a class="video__title" href="https://youtube.com/watch?v=${this.videoId}" target="_blank">${this.title}</a>
        <div class="video__bottom">
          <a class="video__channel" href="https://youtube.com/channel/${this.channelId}">${this.author}</a>
          <span class="video__date">${this.publish.date}</span>
        </div>
      </article>
      ${this.getEndscreens()}
    `;
  }

  getEndscreens() {
    // console.log(this.type, this.endscreens, !this.endscreens)
    if (this.type === "endscreen") {
      return "";
    }

    return this.endscreens?.map((item) => item).join("") || "";
  }

}