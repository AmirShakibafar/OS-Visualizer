import { sleep } from "/js/helpers/helpers.js";
import { memorySpaces, show_memory_sections } from "./memory_table.js";

const playButton = document.getElementById("memory-play-button");
const speedSlider = document.getElementById("speed-range");
let SPEED = 1050 - speedSlider.value;
speedSlider.addEventListener("input", () => {
  SPEED = 1050 - speedSlider.value;
});
const playHandler = async () => {
    for (const space of memorySpaces) {
        space.isActive = true;
        show_memory_sections();
        await sleep(SPEED);
        space.isActive = false;
    }
};

playButton.addEventListener("click", playHandler);
