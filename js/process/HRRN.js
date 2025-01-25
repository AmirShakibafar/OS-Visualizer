import { ShowAvgWaitTime } from "./animation_table.js";
import { Display } from "./display.js";
import { avgWaitTime } from "./avgWaitTimeCalculator.js";


const HRRNProcessSort = (processes) => {
  let curr_tick = 0; 
  const hrrnArray = []; // Array to store the sorted processes with end times
  let remainingProcesses = [...processes];

  while (remainingProcesses.length > 0) {
    let readyProcesses = remainingProcesses.filter(process => process.start <= curr_tick);

    if (readyProcesses.length > 0) {
      let highestRatioProcess = readyProcesses
        .map(process => {
          let waitingTime = curr_tick - process.start;
          let responseRatio = (waitingTime + process.duration) / process.duration;
          return { process, responseRatio };
        })
        .sort((a, b) => b.responseRatio - a.responseRatio)[0];

      let selectedProcess = highestRatioProcess.process;

      curr_tick += selectedProcess.duration;
      selectedProcess.endTime = curr_tick;

      hrrnArray.push(selectedProcess);


      remainingProcesses = remainingProcesses.filter(p => p !== selectedProcess);
    } else {
      curr_tick = Math.min(...remainingProcesses.map(p => p.start));
    }
  }

  return hrrnArray;
};


const HRRN =  async (processes) => {
  processes.forEach((processes) => processes.endTime = undefined)
  let processes_ = HRRNProcessSort(processes);
  const AvgWaitTime = avgWaitTime(processes_);
  await Display(processes_);
  ShowAvgWaitTime(AvgWaitTime);
};


export { HRRN, HRRNProcessSort };
