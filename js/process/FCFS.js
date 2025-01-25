import { Display } from "./display.js";
import { ShowAvgWaitTime, ShowAvgResponseTime } from "./animation_table.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js"
import { avgResponseTime } from "./avgResponseTimeCalculator.js";
import { getContextSwitch } from "./context_switch.js";


const FCFSProcessSort = (processes, contextSwitchTime = 0) => {
  processes.sort((a, b) => a.start - b.start);
  
  let curTime = Number(processes[0].start);
  let FCFSArray = processes;

  FCFSArray.forEach((process, index) => {
    if (curTime < process.start) {
      curTime = process.start;
    }
    curTime += Number(process.duration);
    process.endTime = curTime; 
    if (index !== FCFSArray.length - 1) {
      curTime += contextSwitchTime; 
    }

  });

  return FCFSArray;
}

const FCFS =  async (processes) => {
  processes.forEach((processes) => processes.endTime = undefined)
  const CS = getContextSwitch();
  let processes_ = FCFSProcessSort(processes, CS);
  const AvgWaitTime = avgWaitTime(processes_);
  const AvgResponseTime = avgResponseTime(processes_);
  await Display(processes_, 0, CS);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};



export { FCFS, FCFSProcessSort};
