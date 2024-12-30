import { sleep } from "./helpers/helpers.js";
import { isCancelled, get_next_block, SPEED, ShowAvgTime} from "./animation_table.js";


const FCFS = async (processes) => {
  processes.sort((a, b) => a.start - b.start);
  let curr_tick = 0;
  let totalWaitTime = 0;
  for (const process of processes) {
    let waitTime = 0;
    if (curr_tick >= process.start) {
      waitTime = curr_tick - process.start;
    }
    totalWaitTime += waitTime;

    if (isCancelled) {
      return;
    }
    while (process.start > curr_tick) {
      if (isCancelled) {
        return;
      }
      get_next_block(
        { bgcolor: "#fcfcfc", color: "#000", name: "Idle" },
        curr_tick
      );
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
  const avgWaitTime = totalWaitTime / processes.length;
  ShowAvgTime(avgWaitTime);
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

export { FCFS };
