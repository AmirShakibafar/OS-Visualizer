import { PriorityQueue } from "../helpers/p_queue.js";
import { sleep } from "../helpers/helpers.js";
import {
  isCancelled,
  get_next_block,
  SPEED,
  ShowAvgTime,
} from "./animation_table.js";

const get_srtf_processes = (readyProcesses, currProcess) => {
  const priorityProcesses = new PriorityQueue();
  readyProcesses.forEach((process) => {
    if (process.remaining > 0) {
      priorityProcesses.enqueue(process, process.remaining);
    }
  });
  if (currProcess && currProcess.remaining > 0) {
    priorityProcesses.enqueue(currProcess, currProcess.remaining);
  }

  return priorityProcesses;
};

const SRTF = async (processes) => {
  const readyProcesses = [];
  let curr_tick = 0;
  let index = 0;
  let currProcess = null;
  let totalWaitTime = 0;
  const waitTimes = new Map();

  processes.forEach((process) => {
    process.remaining = process.duration;
    waitTimes.set(process.name, 0);
  });

  while (
    index < processes.length ||
    readyProcesses.length > 0 ||
    (currProcess && currProcess.remaining > 0)
  ) {
    while (index < processes.length && processes[index].start <= curr_tick) {
      readyProcesses.push(processes[index]);
      index++;
    }

    const priorityProcesses = get_srtf_processes(readyProcesses, currProcess);
    const nextProcess = !priorityProcesses.isEmpty()
      ? priorityProcesses.dequeue()
      : null;
    if (!nextProcess) {
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

    if (currProcess !== nextProcess) {
      currProcess = nextProcess;
    }

    readyProcesses.forEach((process) => {
      if (process.name !== currProcess.name && process.remaining > 0) {
        waitTimes.set(process.name, waitTimes.get(process.name) + 1);
      }
    });

    if (currProcess.remaining > 0) {
      if (isCancelled) {
        return;
      }
      get_next_block(currProcess, curr_tick);
      currProcess.remaining--;
      curr_tick++;
      await sleep(SPEED);

      if (currProcess.remaining === 0) {
        const processIndex = readyProcesses.findIndex(
          (p) => p.name === currProcess.name
        );
        if (processIndex !== -1) {
          readyProcesses.splice(processIndex, 1);
        }
      }
    }
  }
  totalWaitTime = Array.from(waitTimes.values()).reduce(
    (sum, wt) => sum + wt,
    0
  );
  const avgWaitTime = totalWaitTime / processes.length;
  ShowAvgTime(avgWaitTime);
};

export { SRTF };
