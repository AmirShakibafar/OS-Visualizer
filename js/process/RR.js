import { Display, SC } from "./display.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"
import { ShowAvgTime } from "./animation_table.js";
const q = 2;

const RRProcessSort = (processes) => {
  processes.sort((a, b) => a.start - b.start);
  processes.forEach((process) => {
    process.remaining = process.duration; 
  });
  let processName = [];
  let curTime = 0; 
  let RRQueue = [];
  let readyQueue = [];
  let completed = 0;
  let newReadyProcesse = [];


  while (completed < processes.length) {
    processes.forEach((process) => {
      if (process.start <= curTime && process.endTime === undefined && !readyQueue.includes(process)) {
        newReadyProcesse.push(process);
      }
    });

    if(readyQueue.length != 0){
      newReadyProcesse.reverse();
      newReadyProcesse.forEach((process) => {
        readyQueue.unshift(process);
      })
    }else{
      newReadyProcesse.forEach((process) => {
        readyQueue.push(process);
      })
    }
    newReadyProcesse = [];

    if (readyQueue.length === 0) {
      curTime = Math.min(...processes.filter(p => p.endTime === undefined).map(p => p.start));
      continue;
    }

    let countProcessesReady = readyQueue.length;
    for(let i = 0; i < countProcessesReady; i++){
      let currProcess = readyQueue.shift();

     

      //////////////////////////////// handle SC
      processName.push(currProcess.name);
      if(processName.length > 1){
        if(processName[processName.length-2] !== currProcess.name){
          curTime += SC;
        }
      }
      ////////////////////////////
      if (currProcess.remaining > q) {

        RRQueue.push({ ...currProcess });
        currProcess.remaining -= q;
        curTime += q;

      } else {
        curTime += currProcess.remaining;
        currProcess.endTime = curTime;

        RRQueue.push({ ...currProcess });
        currProcess.remaining = 0;
        completed++;
      }

      if (currProcess.remaining > 0) {
        readyQueue.push(currProcess);
      }

    }
  }
  return RRQueue;
};



const RR =  async (processes) => {
  processes.forEach((process) => {
    process.remaining = undefined
    process.endTime = undefined
  })

  let processes_ = [...RRProcessSort(processes)];
  const AvgWaitTime = avgWaitTime(processes_);
  await Display(processes_, q);
  ShowAvgTime(AvgWaitTime);
};


export { RR,RRProcessSort };

