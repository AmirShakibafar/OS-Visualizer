import { Display } from "./display.js";
import { ShowAvgWaitTime } from "./animation_table.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"



const FCFSProcessSort =  (processes) =>{
  processes.sort((a, b) => a.start - b.start);
  let curTime = Number(processes[0].start);
  let FCFSArray = processes;

  FCFSArray.forEach((process) => {
    if (curTime < process.start)
      curTime = process.start;
    curTime += Number(process.duration) 
    process.endTime = curTime;
  })

  return FCFSArray;
}


const FCFS =  async (processes) => {
  processes.forEach((processes) => processes.endTime = undefined)
  let processes_ = FCFSProcessSort(processes);
  const AvgWaitTime = avgWaitTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
};



export { FCFS, FCFSProcessSort};
