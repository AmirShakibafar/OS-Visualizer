// Process Visualizer


import { sleep } from "../helpers/helpers.js";
import {
  isCancelled,
  get_next_block,
  SPEED,
} from "./animation_table.js";

// handels execution of the idle state
const handleIdleState = async (curr_tick) => {
  if (isCancelled) {
    return { curr_tick: null }; 
  }
  get_next_block(
    { bgcolor: "#fcfcfc", color: "#000", name: "Idle" },
    curr_tick
  );
  curr_tick++;
  await sleep(SPEED);
  return { curr_tick }; 
};

// handels execution of a process
const processExecution = async (process, curr_tick, duration) => {
  for (let i = 0; i < duration; i++) {
    if (isCancelled) {
      return { curr_tick: null }; 
    }
    get_next_block(process, curr_tick);
    curr_tick++;
    await sleep(SPEED);
  }
  return { curr_tick }; 
};

// refactored Display function
const Display = async (processes, q = 0) => {
  let curr_tick = 0;
  for (const process of processes) {
    if (isCancelled) {
      return;
    }

    while (process.start > curr_tick) {
      const result = await handleIdleState(curr_tick);
      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;
    }

    if (q == 0) {
      // For FCFS, SPN, HRRN
      let duration = process.duration;
      const result = await processExecution(process, curr_tick, duration);
      if (result.curr_tick === null) return; 
      curr_tick = result.curr_tick;
    } else {
      // For RR
      let remaining = process.remaining;
      const result = await processExecution(process, curr_tick, Math.min(q, remaining)); // if remaining is smaller than q its handled
      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;
    }
  }
};


export { Display };