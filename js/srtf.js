import { PriorityQueue } from "./p_queue.js";
import { sleep } from "./helpers.js";
import { isCancelled, get_next_block, SPEED } from "./animation_table.js";

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
  console.log(priorityProcesses.isEmpty())
  
  return priorityProcesses;
};

const SRTF = async (processes) => {
    console.log(processes);
  const readyProcesses = [];
  let curr_tick = 0;
  let index = 0; 
  let currProcess = null; 

  while (
    index < processes.length ||
    readyProcesses.length > 0 ||
    (currProcess && currProcess.remaining > 0)
  ) {
    while (index < processes.length && processes[index].start <= curr_tick) {
      processes[index].remaining = processes[index].duration;
      readyProcesses.push(processes[index]);
      index++;
    }

    const priorityProcesses = get_srtf_processes(readyProcesses, currProcess);
    const nextProcess = !priorityProcesses.isEmpty() ? priorityProcesses.dequeue():null;
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

    if (currProcess.remaining > 0) {
      if (isCancelled) {
        return;
      }
      get_next_block(currProcess, curr_tick);
      currProcess.remaining--;
      curr_tick++;
      await sleep(SPEED);

      if (currProcess.remaining === 0) {
        const processIndex = readyProcesses.findIndex((p) => p.name === currProcess.name);
        if (processIndex !== -1) {
          readyProcesses.splice(processIndex, 1);
        }
      }
    }
  }
};

export { SRTF };
