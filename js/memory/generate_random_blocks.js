import { sleep } from "/js/helpers/helpers.js";
import { memorySpaces, show_memory_sections } from "./memory_table.js";

const playButton = document.getElementById("memory-play-button");

const playHandler = async () => {
    for (const space of memorySpaces) {
        space.isActive = true;
        show_memory_sections();
        await sleep(500);
        space.isActive = false;
    }
};

playButton.addEventListener("click", playHandler);
