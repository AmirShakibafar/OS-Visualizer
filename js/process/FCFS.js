import { sleep } from "../helpers/helpers.js";
import {
  isCancelled,
  get_next_block,
  SPEED,
  ShowAvgTime,
} from "./animation_table.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"



const FCFSProcessSort =  (processes) =>{
  processes.sort((a, b) => a.start - b.start);
  let curTime = Number(processes[0].start);

  processes.forEach((process) => {
    curTime += Number(process.duration) 
    process.endTime = curTime;
    console.log(process.endTime);
  })

  return processes;
}


const FCFSDisplay = async (processes) => {
  let curr_tick = 0;
  for (const process of processes) {
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
}

const FCFS =  (processes) => {
  processes = FCFSProcessSort(processes);
  const AvgWaitTime = avgWaitTime(processes);
  FCFSDisplay(processes);
  ShowAvgTime(AvgWaitTime);
};



export { FCFS };
