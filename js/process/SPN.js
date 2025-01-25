import { ShowAvgWaitTime, ShowAvgResponseTime } from "./animation_table.js";
import { Display } from "./display.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js";
import { avgResponseTime } from "./avgResponseTimeCalculator.js";


const SPNProcessSort = (processes) => {
  processes.sort((a, b) => a.start - b.start);
  let ProcessesClone = processes
  let curTime = 0;
  let SPNArray = [];
  let readyToProcess = [];

  while (SPNArray.length < processes.length) {
    readyToProcess = ProcessesClone.filter(
      (p) => Number(p.start) <= curTime && p.endTime === undefined
    );

    readyToProcess.sort((a, b) => a.duration - b.duration);
    if (readyToProcess.length > 0) {

      curTime += Number(readyToProcess[0].duration);
      readyToProcess[0].endTime = curTime;
      SPNArray.push(readyToProcess[0]);

    } else {
      const nextProcess = processes.find((p) => p.endTime === undefined);
      if (nextProcess) curTime = Number(nextProcess.start);
    }
  }
  return SPNArray;
};



const SPN =  async (processes) => {
  processes.forEach((processes) => processes.endTime = undefined)
  let processes_ = SPNProcessSort(processes);
  const AvgWaitTime = avgWaitTime(processes_);
  const AvgResponseTime = avgResponseTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};

export { SPN, SPNProcessSort };
