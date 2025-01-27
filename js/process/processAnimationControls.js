import { whatPolicy } from "./timing_policies.js";
import { resetTableSettings } from "./processAnimationView.js";
import { getProcesses } from "./processes.js";
import { setAnimationSpeed } from "../helpers/speed.js";
import {
  setIsCancelled,
  reSetIsCancelled,
  readIsCancelled,
} from "../helpers/cancelFlag.js";

const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
const speedSlider = document.getElementById("speed-range");

const BASE_SPEED = 1050;
let speed = BASE_SPEED - speedSlider.value;
const updateSpeed = () => {
  speed = BASE_SPEED - speedSlider.value;
  setAnimationSpeed(speed);
};

updateSpeed();
speedSlider.addEventListener("input", updateSpeed);

const handlePlayButtonClick = async () => {
  if (!getProcesses().length) return;
  resetTableSettings();
  reSetIsCancelled();
  playButton.disabled = true;
  const policy = whatPolicy();
  await policy(getProcesses());
  if (readIsCancelled()) resetTableSettings();
  playButton.disabled = false;
};

const handleResetButtonClick = () => {
  setIsCancelled();
  resetTableSettings()
};

playButton.addEventListener("click", handlePlayButtonClick);
resetButton.addEventListener("click", handleResetButtonClick);
