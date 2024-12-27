import { sleep } from "./helpers.js";
import { isCancelled, get_next_block, SPEED } from "./animation_table.js";

const RR = async (processes) => {
  const readyQueue = [];
  let curr_tick = 0;
  let index = 0;
  let currProcess = null; 

  processes.forEach((process) => {
    process.remaining = process.duration; 
  });

  while (
    index < processes.length || 
    readyQueue.length > 0 ||
    (currProcess && currProcess.remaining > 0)
  ) {
    while (index < processes.length && processes[index].start <= curr_tick) {
      readyQueue.unshift(processes[index]);
      index++;
    }

    if (!currProcess && readyQueue.length > 0) {
      currProcess = readyQueue.shift(); 
    }

    if (!currProcess) {
      if (isCancelled) {
        return;
      }
      get_next_block(
        { bgcolor: "#fcfcfc", color: "#000", name: "Idle" },
        curr_tick
      );
      curr_tick++;
      await sleep(SPEED);
      continue;
    }

    let timeSlice = Math.min(currProcess.remaining, 4);

    while (timeSlice > 0) {
      if (isCancelled) {
        return;
      }
      get_next_block(currProcess, curr_tick);
      currProcess.remaining--;
      curr_tick++;
      timeSlice--;
      await sleep(SPEED);
    }

    if (currProcess.remaining > 0) {
      readyQueue.push(currProcess);
    }
    currProcess = null;
  }
};

export { RR };

