// Process Visualizer


import { sleep } from "../helpers/helpers.js";
import {
  isCancelled,
  get_next_block,
  SPEED,
} from "./animation_table.js";


const Display = async (processes, q=0) => {
  if(q==0){
    // For FCFS & SPN & HRRN
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
  }else{
    // For RR
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
      if (process.remaining > q){
        for(let i = 0; i < q; i++){
          get_next_block(process, curr_tick);
          curr_tick++;
          await sleep(SPEED);
        }
      }else{
        for(let i = 0; i < process.remaining; i++){
          get_next_block(process, curr_tick);
          curr_tick++;
          await sleep(SPEED);
        }
      }
      
    }
  }
}

export { Display };