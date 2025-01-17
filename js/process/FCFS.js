import { Display } from "./display.js";
import { ShowAvgTime } from "./animation_table.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"



const FCFSProcessSort =  (processes) =>{
  processes.sort((a, b) => a.start - b.start);
  let curTime = Number(processes[0].start);

  processes.forEach((process) => {
    if (curTime < process.start)
      curTime = process.start;
    curTime += Number(process.duration) 
    process.endTime = curTime;
  })

  return processes;
}


const FCFS =  (processes) => {
  processes = FCFSProcessSort(processes);
  const AvgWaitTime = avgWaitTime(processes);
  Display(processes);
  ShowAvgTime(AvgWaitTime);
};



export { FCFS, FCFSProcessSort};
