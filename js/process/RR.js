import { sleep } from "../helpers/helpers.js";
import { isCancelled, get_next_block, SPEED, ShowAvgTime } from "./animation_table.js";

const RR = async (processes) => {
  const readyQueue = [];
  let curr_tick = 0;
  let index = 0;
  let currProcess = null;
  const waitTimes = new Map();
  let totalWaitTime = 0;

  processes.forEach((process) => {
    process.remaining = process.duration;
    process.lastExecution = process.start;
    waitTimes.set(process.name, 0);
  });

  while (
    index < processes.length || 
    readyQueue.length > 0 || 
    (currProcess && currProcess.remaining > 0)
  ) {
    while (index < processes.length && processes[index].start <= curr_tick) {
      readyQueue.push(processes[index]);
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

    const timeSlice = Math.min(currProcess.remaining, 4);

    const waitingTime = curr_tick - currProcess.lastExecution;
    waitTimes.set(currProcess.name, waitTimes.get(currProcess.name) + waitingTime);

    for (let t = 0; t < timeSlice; t++) {
      if (isCancelled) {
        return;
      }
      get_next_block(currProcess, curr_tick);
      currProcess.remaining--;
      curr_tick++;
      await sleep(SPEED);
    }

    currProcess.lastExecution = curr_tick;

    if (currProcess.remaining > 0) {
      readyQueue.push(currProcess);
    }

    currProcess = null;
  }

  processes.forEach((process) => {
    totalWaitTime += waitTimes.get(process.name);
  });

  const avgWaitTime = totalWaitTime / processes.length;
  ShowAvgTime(avgWaitTime);
};

export { RR };

