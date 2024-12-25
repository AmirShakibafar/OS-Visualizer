import { sleep } from "./helpers.js";
import { isCancelled, get_next_block } from "./animation_table.js";
const speedSlider = document.getElementById("speed-range");
let SPEED = 1050 - speedSlider.value;
speedSlider.addEventListener("input", () => {
  SPEED = 1050 - speedSlider.value;
});

const FCFS = async (processes) => {
  processes.sort((a, b) => a.start - b.start); // Sort processes by start time
  let curr_tick = 0;
  for (const process of processes) {
    if (isCancelled) {
      return;
    }
    while (process.start > curr_tick) {
      if (isCancelled) {
        return;
      }
      get_next_block({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" }, curr_tick);
      curr_tick++;
      await sleep(SPEED);
    }
    let duration = process.duration;
    while (duration > 0) {
      if (isCancelled) {
        return;
      }
      get_next_block(process, curr_tick);
      duration--;
      curr_tick++;
      await sleep(SPEED);
    }
  }
};

const FCFSArray = (processes) => {
  processes.sort((a, b) => a.start - b.start); // Sort processes by start time
  const fcfs = [];
  let curr_tick = 0;
  for (const process of processes) {
    while (process.start > curr_tick) {
      fcfs.push({ color: "#fafafa", name: "Idle" });
      curr_tick++;
    }
    let duration = process.duration;
    while (duration > 0) {
      fcfs.push(process);
      duration--;
      curr_tick++;
    }
  }
  return fcfs;
};

export {FCFS}