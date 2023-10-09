import { connect, setOptions } from "./connector/index.js";
import { createVideo } from "./elements/index.js";

const form = document.querySelector(".form");
const input = document.querySelector("input");
const output = document.querySelector(".output");

form.addEventListener("submit", handleSubmit);

setOptions({
  container: output,
});

let videoItems = [];

// const connection1 = connect(".video1", ".video2", {
//   container: ".output",
//   // anchorB: "vertical",
//   // anchorA: "vertical",
// });

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
  // console.log(videos);
}

function buildItems(videos) {
  videoItems = videos.map((video, index) => {
    return createVideo(video, index);
  });

  console.log(videoItems)

  output.innerHTML = videoItems.map((video) => video).join("");
}