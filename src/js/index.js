const form = document.querySelector(".form");
const input = document.querySelector("input");
const output = document.querySelector(".output");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const channelId = input.value.split("/").slice(-1)[0]
  const params  = {
    // id: "UC0sEqnEgQSx5ee0sdYXQMiQ",
    id: channelId,
  };

  const response = await fetch("http://localhost:3333/get/", {
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
      <span class="video__title">${video.title}</span>
      <a href="https://youtube.com/channel/${video.channelId}" class="video__channel">${video.author}</a>
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