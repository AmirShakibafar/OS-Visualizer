import { Display, SC } from "./display.js";
import { ShowAvgTime } from "./animation_table.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"



const FCFSProcessSort =  (processes) =>{
  processes.sort((a, b) => a.start - b.start);
  let curTime = Number(processes[0].start);
  let FCFSArray = processes;
  let firstProcess = true;
  
  FCFSArray.forEach((process) => {
    if (curTime < process.start)
      curTime = process.start;
    curTime += Number(process.duration) 
    if(firstProcess){
      process.endTime = curTime;
      firstProcess = false;
    }else{
      process.endTime = curTime + SC;
      curTime += SC;
    }
    
  })

  return FCFSArray;
}


const FCFS =  async (processes) => {
  processes.forEach((processes) => processes.endTime = undefined)
  let processes_ = FCFSProcessSort(processes);
  const AvgWaitTime = avgWaitTime(processes_);
  await Display(processes_);
  ShowAvgTime(AvgWaitTime);
};



export { FCFS, FCFSProcessSort};
