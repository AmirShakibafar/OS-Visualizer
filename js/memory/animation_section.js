import { setAnimationSpeed } from "../helpers/speed.js";
import { renderMemorySections } from "./memory_table.js";
import { clearMemorySpaces, getMemorySpaces } from "./memory_space.js";
import { resetTime } from "./timer.js";
import { whatPolicy } from "./hub_algorithmes.js";
import { isCancelled } from "../process/processAnimationSection.js";

const playButton = document.getElementById("memory-play-button");
const cancelButton = document.getElementById("memory-reset-button");
const speedSlider = document.getElementById("speed-range");

isCancelled = false;
let SPEED = 1050 - speedSlider.value;
const updateSPEED = () => {
  SPEED = 1050 - speedSlider.value;
  setAnimationSpeed(SPEED);
}
updateSPEED();
speedSlider.addEventListener("input", updateSPEED);

const playHandler = async () => {
  if (!getMemorySpaces().length) {
    return;
  }
  setAnimationSpeed(SPEED);
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
