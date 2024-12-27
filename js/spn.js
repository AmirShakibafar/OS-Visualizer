import { PriorityQueue } from "./p_queue.js";
import { sleep } from "./helpers.js";
import { isCancelled, get_next_block, SPEED } from "./animation_table.js";

const get_spn_processes = (readyProcesses) => {
  const priorityProcesses = new PriorityQueue();
  readyProcesses.forEach((process) => {
    priorityProcesses.enqueue(process, process.duration);
  });
  return priorityProcesses;
};

const SPN = async (processes) => {
  const readyProcesses = [];
  let curr_tick = 0;
  let index = 0;

  while (index < processes.length || readyProcesses.length > 0) {
    console.log(0)
    while (index < processes.length && processes[index].start <= curr_tick) {
      readyProcesses.push(processes[index]);
      index++;
    }

    // If no process is ready, simulate idle time
    if (readyProcesses.length === 0) {
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

    const priorityProcesses = get_spn_processes(readyProcesses);
    const process = priorityProcesses.dequeue();

    const processIndex = readyProcesses.findIndex((p) => p.name === process.name);
    if (processIndex !== -1) {
      readyProcesses.splice(processIndex, 1);
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

export { get_spn_processes, SPN };
