import { sleep } from "/js/helpers/helpers.js";
import { renderMemorySections } from "./memory_table.js";
import { getMemoryBlocks } from "./memory_blocks.js";
import { executeFirstFit } from "./first_fit.js";
const playButton = document.getElementById("memory-play-button");
const speedSlider = document.getElementById("speed-range");
let SPEED = 1050 - speedSlider.value;
speedSlider.addEventListener("input", () => {
  SPEED = 1050 - speedSlider.value;
});

const playHandler = async () => {
  executeFirstFit();
};

playButton.addEventListener("click", playHandler);
