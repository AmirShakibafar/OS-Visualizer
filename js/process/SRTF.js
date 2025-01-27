import { Display } from "./display.js";
import { avgWaitTime, ShowAvgWaitTime } from "./avgWaitTimeCalculator.js";
import { avgResponseTime, ShowAvgResponseTime } from "./avgResponseTimeCalculator.js";
import { getContextSwitch } from "./context_switch.js";

const SRTFProcessSort = (processes, q, CS) => {
  processes.sort((a, b) => a.start - b.start);
  processes.forEach((process) => {
    process.remaining = process.duration;
  });

  let curTime = 0;
  let SRTFQueue = [];
  let readyQueue = [];
  let completed = 0;
  let processName = [];

  while (completed < processes.length) {
    processes.forEach((process) => {
      if (
        process.start <= curTime &&
        process.endTime === undefined &&
        !readyQueue.includes(process)
      ) {
        readyQueue.push(process);
      }
    });

    if (readyQueue.length === 0) {
      curTime = Math.min(
        ...processes.filter((p) => p.endTime === undefined).map((p) => p.start)
      );
      continue;
    }
    readyQueue.sort((a, b) => a.remaining - b.remaining);

    let currProcess = readyQueue.shift();

    //////////////////////////////// handle SC
    processName.push(currProcess.name);
    if (processName.length > 1) {
      if (processName[processName.length - 2] !== currProcess.name) {
        curTime += CS;
      }
    }
    ////////////////////////////
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

const SRTF = async (processes) => {
  processes.forEach((process) => {
    process.remaining = undefined;
    process.endTime = undefined;
  });
  const CS = getContextSwitch();
  let processes_ = [...SRTFProcessSort(processes, 1, CS)];
  await Display(processes_, 1);
  const AvgWaitTime = avgWaitTime(processes_);
  const AvgResponseTime = avgResponseTime(processes_);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};
export { SRTFProcessSort, SRTF };
