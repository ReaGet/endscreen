import { connect } from "./connector.js";

const connection1 = connect(".video1", ".video2", {
  // anchorB: "vertical",
  // anchorA: "vertical",
});

const form = document.querySelector(".form");
const input = document.querySelector("input");
const output = document.querySelector(".output");

form.addEventListener("submit", handleSubmit);

const apiURL = {
  local: "localhost",
  external: "192.168.0.110",
};

async function handleSubmit(event) {
  event.preventDefault();
  const channelId = input.value.split("/").slice(-1)[0]
  const params  = {
    // id: "UC0sEqnEgQSx5ee0sdYXQMiQ",
    id: channelId,
  };

  const response = await fetch(`http://${apiURL.external}:3333/get/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const videos = await response.json();
  buildItems(videos.data);
  console.log(videos);
}

function buildItems(videos) {
  const html = videos.reduce((markup, video) => {
    return (markup += createItem(video));
  }, "");

  output.innerHTML = html;
}

function createItem(video) {
  return `
    <article class="video">
      <div class="video__img">
        <img src="${video.thumbnail.url}" alt="" width="250" height="140">
        <div class="video__duration">${convertTime(video.duration)}</div>
      </div>
      <a class="video__title" href="https://youtube.com/watch?v=${video.videoId}" target="_blank">${video.title}</a>
      <div class="video__bottom">
        <a class="video__channel" href="https://youtube.com/channel/${video.channelId}">${video.author}</a>
        <span class="video__date">${video.publish.date}</span>
      </div>
    </article>
  `;
}

function convertTime(totalSeconds) {
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  
  return (/0{1,2}/g.test(hours) !== true ? hours + ":" : "") + minutes + ":" + seconds;
}