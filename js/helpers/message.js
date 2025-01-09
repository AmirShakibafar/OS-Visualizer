import { sleep } from "./helpers.js";
const messageBox = document.getElementById("message-area");

let currentMessageId = 0;
const showMessage = async (message, type) => {
  const messageId = ++currentMessageId;
  messageBox.innerHTML = "";
  messageBox.style.visibility = "visible";
  const messageText = document.createElement("h1");
  messageText.innerText = message;
  messageBox.style.color = "#fff";
  messageBox.appendChild(messageText);
  if (type === "success") {
    messageBox.style.color = "#2c5204";
  } else if (type === "fail") {
    messageBox.style.color = "#FF312E";
  } else {
    messageBox.style.color = "#000";
  }
  await sleep(1500);
  if (messageId === currentMessageId) {
    messageBox.style.visibility = "hidden";
  }
};

export { showMessage };
