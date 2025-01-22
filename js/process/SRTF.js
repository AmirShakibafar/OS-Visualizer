import { Display } from "./display.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"
import { ShowAvgTime } from "./animation_table.js";

const q = 1;

const SRTFProcessSort = (processes) => {
  processes.sort((a, b) => a.start - b.start);
  processes.forEach((process) => {
    process.remaining = process.duration; 
  });

  let curTime = 0; 
  let SRTFQueue = [];
  let readyQueue = [];
  let completed = 0;

  while (completed < processes.length) {
    processes.forEach((process) => {
      if (process.start <= curTime && process.endTime === undefined && !readyQueue.includes(process)) {
        readyQueue.push(process);
      }
    });

    if (readyQueue.length === 0) {
      curTime = Math.min(...processes.filter(p => p.endTime === undefined).map(p => p.start));
      continue;
    }
    readyQueue.sort((a, b) => a.remaining - b.remaining)
    
    let currProcess = readyQueue.shift();
    if (currProcess.remaining > q) {
      SRTFQueue.push({ ...currProcess });
      currProcess.remaining -= q;
      curTime += q;
    } else {
      curTime += currProcess.remaining;
      currProcess.endTime = curTime;
      SRTFQueue.push({ ...currProcess });
      currProcess.remaining = 0;
      completed++;
    }
    if (currProcess.remaining > 0) {
      readyQueue.push(currProcess);
    }

    
  }
  return SRTFQueue;
};


const SRTF =  async (processes) => {
  processes.forEach((process) => {
    process.remaining = undefined
    process.endTime = undefined
  })

  let processes_ = [...SRTFProcessSort(processes)];
  const AvgWaitTime = avgWaitTime(processes_);
  await Display(processes_, q);
  ShowAvgTime(AvgWaitTime);
};
export { SRTFProcessSort, SRTF };
