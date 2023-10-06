const form = document.querySelector(".form");
const input = document.querySelector("input");

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
  const data = await response.json();

  console.log(data);
}