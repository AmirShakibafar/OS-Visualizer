// Process Visualizer

import { sleep } from "../helpers/helpers.js";
import { isCancelled, get_next_block, SPEED } from "./animation_table.js";

// Handles execution of the idle state
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

// Handles execution of a process
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

// Handles context switching
const handleContextSwitch = async (curr_tick) => {
  if (isCancelled) {
    return { curr_tick: null };
  }
  get_next_block(
    { bgcolor: "#000", color: "#fff", name: "CS" },
    curr_tick
  );
  curr_tick++;
  await sleep(SPEED);
  return { curr_tick };
};

// Refactored Display function
const Display = async (processes, q = 0, contextSwitch = 0) => {
  let curr_tick = 0;
  let processQueue = processes.map((p) => ({ ...p, remaining: p.duration }));

  for (let i = 0; i < processQueue.length; i++) {
    const process = processQueue[i];
    if (isCancelled) {
      return;
    }

    while (process.start > curr_tick) {
      const result = await handleIdleState(curr_tick);
      if (result.curr_tick === null) return;
      curr_tick = result.curr_tick;
    }

    let execute_time = q ? Math.min(q, process.remaining) : process.remaining;
    const result = await processExecution(process, curr_tick, execute_time);
    if (result.curr_tick === null) return;
    curr_tick = result.curr_tick;
    process.remaining -= execute_time;

    if (i < processQueue.length - 1 && contextSwitch > 0) {
      for (let j = 0; j < contextSwitch; j++) {
        const csResult = await handleContextSwitch(curr_tick);
        if (csResult.curr_tick === null) return;
        curr_tick = csResult.curr_tick;
      }
    }
  }
};

export { Display };
