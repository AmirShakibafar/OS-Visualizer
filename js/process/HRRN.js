import { Display } from "./display.js";
import { avgWaitTime, ShowAvgWaitTime } from "./avgWaitTimeCalculator.js";
import { avgResponseTime, ShowAvgResponseTime } from "./avgResponseTimeCalculator.js";
import { getContextSwitch } from "./context_switch.js";

const HRRNProcessSort = (processes, CS) => {
  let curr_tick = 0;
  const hrrnArray = []; // Array to store the sorted processes with end times
  let remainingProcesses = [...processes];
  let firstProcess = true;

  while (remainingProcesses.length > 0) {
    let readyProcesses = remainingProcesses.filter(
      (process) => process.start <= curr_tick
    );

    if (readyProcesses.length > 0) {
      let highestRatioProcess = readyProcesses
        .map((process) => {
          let waitingTime = curr_tick - process.start;
          let responseRatio =
            (waitingTime + process.duration) / process.duration;
          return { process, responseRatio };
        })
        .sort((a, b) => b.responseRatio - a.responseRatio)[0];

      let selectedProcess = highestRatioProcess.process;

      curr_tick += selectedProcess.duration;
      if (firstProcess) {
        selectedProcess.endTime = curr_tick;
        firstProcess = false;
      } else {
        selectedProcess.endTime = curr_tick + CS;
        curr_tick += CS;
      }

      hrrnArray.push(selectedProcess);

      remainingProcesses = remainingProcesses.filter(
        (p) => p !== selectedProcess
      );
    } else {
      curr_tick = Math.min(...remainingProcesses.map((p) => p.start));
    }
  }

  return hrrnArray;
};

const HRRN = async (processes) => {
  processes.forEach((processes) => (processes.endTime = undefined));
  const CS = getContextSwitch();
  let processes_ = [...HRRNProcessSort(processes, CS)];
  const AvgWaitTime = avgWaitTime(processes_);
  const AvgResponseTime = avgResponseTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
  ShowAvgResponseTime(AvgResponseTime);
};

export { HRRN, HRRNProcessSort };
