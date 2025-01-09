import { executeFirstFit, setAnimationSpeed } from "./first_fit.js";
const playButton = document.getElementById("memory-play-button");
const speedSlider = document.getElementById("speed-range");

let SPEED = 1050 - speedSlider.value;
speedSlider.addEventListener("input", () => {
  SPEED = 1050 - speedSlider.value;
  setAnimationSpeed(SPEED); 
});

const playHandler = async () => {
  setAnimationSpeed(SPEED);
  await executeFirstFit();
};

playButton.addEventListener("click", playHandler);
