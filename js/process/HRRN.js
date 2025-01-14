import { sleep } from "../helpers/helpers.js";
import {
  isCancelled,
  get_next_block,
  SPEED,
  ShowAvgTime,
} from "./animation_table.js";

const HRRN = async (processes) => {
  let curr_tick = 0;
  let totalWaitTime = 0;

  // Sort processes by their start time
  processes.sort((a, b) => a.start - b.start);

  let remainingProcesses = [...processes]; // Copy of processes to manage the ones still to be processed

  while (remainingProcesses.length > 0) {
    // Get the ready processes (those whose start time has passed)
    let readyProcesses = remainingProcesses.filter(process => process.start <= curr_tick);
    
    if (readyProcesses.length > 0) {
      // Calculate response ratios for ready processes
      let highestRatioProcess = readyProcesses.map(process => {
        let waitingTime = curr_tick - process.start;
        let responseRatio = (waitingTime + process.duration) / process.duration;
        return { process, responseRatio };
      }).sort((a, b) => b.responseRatio - a.responseRatio)[0]; // Sort by highest response ratio

      let process = highestRatioProcess.process;
      let waitTime = curr_tick - process.start;
      totalWaitTime += waitTime;

      // Execute the selected process
      remainingProcesses = remainingProcesses.filter(p => p !== process);

      if (isCancelled) {
        return;
      }

      // Idle time until process start
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

    } else {
      // If no process is ready, idle until the next process start
      get_next_block(
        { bgcolor: "#fcfcfc", color: "#000", name: "Idle" },
        curr_tick
      );
      curr_tick++;
      await sleep(SPEED);
    }
  }

  // Calculate average wait time
  const avgWaitTime = totalWaitTime / processes.length;
  ShowAvgTime(avgWaitTime);
};

const HRRNArray = (processes) => {
  let curr_tick = 0;
  const hrrnArray = [];
  let remainingProcesses = [...processes]; // Copy of processes to manage the ones still to be processed

  while (remainingProcesses.length > 0) {
    let readyProcesses = remainingProcesses.filter(process => process.start <= curr_tick);

    if (readyProcesses.length > 0) {
      let highestRatioProcess = readyProcesses.map(process => {
        let waitingTime = curr_tick - process.start;
        let responseRatio = (waitingTime + process.duration) / process.duration;
        return { process, responseRatio };
      }).sort((a, b) => b.responseRatio - a.responseRatio)[0];

      let process = highestRatioProcess.process;
      remainingProcesses = remainingProcesses.filter(p => p !== process);

      // Add idle time
      while (process.start > curr_tick) {
        hrrnArray.push({ color: "#fafafa", name: "Idle" });
        curr_tick++;
      }

      // Add process execution time
      let duration = process.duration;
      while (duration > 0) {
        hrrnArray.push(process);
        duration--;
        curr_tick++;
      }
    } else {
      hrrnArray.push({ color: "#fafafa", name: "Idle" });
      curr_tick++;
    }
  }

  return hrrnArray;
};

export { HRRN };
