import { Display } from "./display.js";
import { ShowAvgWaitTime, ShowAvgResponseTime } from "./animation_table.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"
import { avgResponseTime } from "./avgResponseTimeCalculator.js";


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
  const AvgResponseTime = avgResponseTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};



export { FCFS, FCFSProcessSort};
