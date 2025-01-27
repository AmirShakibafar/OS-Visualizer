import { Display } from "./display.js";
import { avgWaitTime, ShowAvgWaitTime } from "./avgWaitTimeCalculator.js";
import { avgResponseTime, ShowAvgResponseTime } from "./avgResponseTimeCalculator.js";
import { getContextSwitch } from "./context_switch.js";

const SPNProcessSort = (processes, CS) => {
  processes.sort((a, b) => a.start - b.start);
  let ProcessesClone = processes;
  let curTime = 0;
  let SPNArray = [];
  let readyToProcess = [];
  let firstProcess = true;

  while (SPNArray.length < processes.length) {
    readyToProcess = ProcessesClone.filter(
      (p) => Number(p.start) <= curTime && p.endTime === undefined
    );

    readyToProcess.sort((a, b) => a.duration - b.duration);
    if (readyToProcess.length > 0) {
      curTime += Number(readyToProcess[0].duration);

      if (firstProcess) {
        readyToProcess[0].endTime = curTime;
        firstProcess = false;
      } else {
        readyToProcess[0].endTime = curTime + CS;
        curTime += CS;
      }

      SPNArray.push(readyToProcess[0]);
    } else {
      const nextProcess = processes.find((p) => p.endTime === undefined);
      if (nextProcess) curTime = Number(nextProcess.start);
    }
  }
  return SPNArray;
};

const SPN = async (processes) => {
  processes.forEach((processes) => (processes.endTime = undefined));
  const CS = getContextSwitch();
  let processes_ = [...SPNProcessSort(processes, CS)];
  const AvgWaitTime = avgWaitTime(processes_);
  const AvgResponseTime = avgResponseTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};

export { SPN, SPNProcessSort };
