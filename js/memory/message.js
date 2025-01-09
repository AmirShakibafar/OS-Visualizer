import { sleep } from "../helpers/helpers.js";
const messageBox = document.getElementById("message-area");

let currentMessageId = 0;
const showMessage = async (message, type) => {
  const messageId = ++currentMessageId;
  messageBox.innerHTML = "";
  messageBox.style.display = "block";
  const messageText = document.createElement("h2");
  messageText.innerText = message;
  messageBox.style.color = "#fff";
  messageBox.appendChild(messageText);
  if (type === "success") {
    messageBox.style.backgroundColor = "#97DB4F";
  } else if (type === "failed") {
    messageBox.style.backgroundColor = "#FF312E";
  } else {
    messageBox.style.backgroundColor = "#fff";
  }
  await sleep(1500);
  if (messageId === currentMessageId) {
    messageBox.style.display = "none";
  }
};

export { showMessage };
