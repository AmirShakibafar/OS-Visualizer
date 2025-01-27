import { Display } from "./display.js";
import { avgWaitTime, ShowAvgWaitTime } from "./avgWaitTimeCalculator.js";
import { avgResponseTime, ShowAvgResponseTime } from "./avgResponseTimeCalculator.js";
import { getContextSwitch } from "./context_switch.js";

const FCFSProcessSort = (processes, CS) => {
  processes.sort((a, b) => a.start - b.start);
  let curTime = Number(processes[0].start);
  let FCFSArray = processes;
  let firstProcess = true;

  FCFSArray.forEach((process) => {
    if (curTime < process.start) curTime = process.start;
    curTime += Number(process.duration);
    if (firstProcess) {
      process.endTime = curTime;
      firstProcess = false;
    } else {
      process.endTime = curTime + CS;
      curTime += CS;
    }
  });

  return FCFSArray;
};

const FCFS = async (processes) => {
  processes.forEach((processes) => (processes.endTime = undefined));
  const CS = getContextSwitch();
  let processes_ = [...FCFSProcessSort(processes, CS)];
  const AvgWaitTime = avgWaitTime(processes_);
  const AvgResponseTime = avgResponseTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};

export { FCFS, FCFSProcessSort };
