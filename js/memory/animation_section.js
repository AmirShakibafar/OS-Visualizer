import { setAnimationSpeed } from "../helpers/speed.js";
import { renderMemorySections } from "./memory_table.js";
import { clearMemorySpaces, getMemorySpaces } from "./memory_space.js";
import { resetTime } from "./timer.js";
import { whatPolicy } from "./hub_algorithmes.js";
import {
  setIsCancelled,
  reSetIsCancelled,
  readIsCancelled,
} from "../helpers/cancelFlag.js";

const playButton = document.getElementById("memory-play-button");
const cancelButton = document.getElementById("memory-reset-button");
const speedSlider = document.getElementById("speed-range");

let SPEED = 1050 - speedSlider.value;
const updateSPEED = () => {
  SPEED = 1050 - speedSlider.value;
  setAnimationSpeed(SPEED);
};
updateSPEED();
speedSlider.addEventListener("input", updateSPEED);

const resetAnimationSection = () => {
  clearMemorySpaces();
  renderMemorySections();
  resetTime();
};

const playHandler = async () => {
  if (!getMemorySpaces().length) {
    return;
  }
  reSetIsCancelled();
  resetAnimationSection();
  playButton.disabled = true;
  const policy = whatPolicy();
  await policy();
  if (readIsCancelled) resetAnimationSection();
  playButton.disabled = false;
};

const cancelButtonHandler = () => {
  setIsCancelled();
  resetAnimationSection();
};

playButton.addEventListener("click", playHandler);
cancelButton.addEventListener("click", cancelButtonHandler);
