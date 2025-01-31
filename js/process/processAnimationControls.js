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
const speedBTN = document.getElementById("speedBTN");

const BASE_SPEED = 500;
let stateSpeed = 2;
let speed = BASE_SPEED ;

speedBTN.addEventListener("click", (event) => {
  switch (stateSpeed){
    case 0:
      event.target.textContent = "0.5X"
      speed = BASE_SPEED / 0.5 ;
      stateSpeed++;
      break ;
    case 1:
      event.target.textContent = "1X"
      speed = BASE_SPEED ;
      stateSpeed++;
      break ;
    case 2:
      event.target.textContent = "2X"
      speed = BASE_SPEED / 2 ;
      stateSpeed++;
      break ;
    case 3:
      event.target.textContent = "4X"
      speed = BASE_SPEED / 4;
      stateSpeed++;
      break ;
    case 4:
      event.target.textContent = "8X"
      speed = BASE_SPEED / 8;
      stateSpeed++;
      break ;
    case 5:
      event.target.textContent = "16X"
      speed = BASE_SPEED / 16;
      stateSpeed = 0;
      break ;
  }
  updateSpeed();
})


const updateSpeed = () => {
  setAnimationSpeed(speed);
};


/*
speedSlider.addEventListener("input", updateSpeed);
*/
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
