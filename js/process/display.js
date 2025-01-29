// Process Visualizer

import { sleep } from "../helpers/helpers.js";
import { getNextBlock } from "./processAnimationView.js";
import { readIsCancelled } from "../helpers/cancelFlag.js";
import { SPEED } from "../helpers/speed.js";
import { getContextSwitch } from "./context_switch.js";


const handleCS = async (curr_tick) => {
  if (readIsCancelled()) {
    return { curr_tick: null };
  }
  curr_tick = curr_tick;
  for (let i = 0; i < getContextSwitch(); i++) {
    const result = await handleContextSwitch(curr_tick);

    if (result.curr_tick === null) return;
    curr_tick = result.curr_tick;
  }
  return { curr_tick: curr_tick };
};

// handels execution of the idle state
const handleIdleState = async (curr_tick) => {
  if (readIsCancelled()) {
    return { curr_tick: null };
  }
  getNextBlock(
    { bgcolor: "#fcfcfc", color: "#000", name: "Idle" },
    curr_tick
  );
  curr_tick++;
  await sleep(SPEED);
  return { curr_tick };
};

// handles execution of a process
const processExecution = async (process, curr_tick, duration) => {
  for (let i = 0; i < duration; i++) {
    if (readIsCancelled()) {
      return { curr_tick: null };
    }
    getNextBlock(process, curr_tick);
    curr_tick++;
    await sleep(SPEED);
  }
  return { curr_tick };
};

// handles context switching
const handleContextSwitch = async (curr_tick) => {
  if (readIsCancelled()) {
    return { curr_tick: null };
  }
  getNextBlock({ bgcolor: "#000", color: "#fff", name: "CS" }, curr_tick);
  curr_tick++;
  await sleep(SPEED);
  return { curr_tick };
};

// refactored Display function
const Display = async (processes, q = 0) => {
  let curr_tick = 0;
  let processesName = [];
  for (const process of processes) {
    if (readIsCancelled()) {
      return;
    }
    processesName.push(process.name);

    while (process.start > curr_tick) {
      const result = await handleIdleState(curr_tick);
      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;
    }

    if (q == 0) {
      // For FCFS, SPN, HRRN
      let duration = process.duration;
      let result = await processExecution(process, curr_tick, duration);

      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;

      result = await handleCS(curr_tick);
      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;
    } else {
      // For RR
      if (processesName.length > 1) {
        if (
          processesName[processesName.length - 2] &&
          processesName[processesName.length - 2] !== process.name
        ) {
          const result = await handleCS(curr_tick);
          if (result.curr_tick === null) return;
          curr_tick = result.curr_tick;
        }
      }

      let remaining = process.remaining;
      const result = await processExecution(
        process,
        curr_tick,
        Math.min(q, remaining)
      ); // if remaining is smaller than q its handled
      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;
    }
  }
};


export { Display };
export { handleIdleState, processExecution, handleContextSwitch, handleCS} // needed for testing

