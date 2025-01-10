import { executeFirstFit, setAnimationSpeed } from "./first_fit.js";
import { renderMemorySections } from "./memory_table.js";
import { clearMemorySpaces, getMemorySpaces } from "./memory_space.js";
import { resetTime } from "./timer.js";
import { whatPolicy } from "./hub_algorithmes.js";
const playButton = document.getElementById("memory-play-button");
const cancelButton = document.getElementById("memory-reset-button");
const speedSlider = document.getElementById("speed-range");

let SPEED = 1050 - speedSlider.value;
let isCancelled = false;

speedSlider.addEventListener("input", () => {
  SPEED = 1050 - speedSlider.value;
  setAnimationSpeed(SPEED);
});

const playHandler = async () => {
  if (!getMemorySpaces().length) {
    return;
  }
  isCancelled = false;
  clearMemorySpaces();
  renderMemorySections();
  playButton.disabled = true;
  setAnimationSpeed(SPEED);
  const policy = whatPolicy();
  await policy(() => isCancelled);
  if (isCancelled) {
    clearMemorySpaces();
    renderMemorySections();
    resetTime();
  }
  playButton.disabled = false;
};

const cancelButtonHandler = () => {
  isCancelled = true;
};

playButton.addEventListener("click", playHandler);
cancelButton.addEventListener("click", cancelButtonHandler);
