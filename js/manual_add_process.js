import { allowNumbersOnly, correctInputSize } from "./inputValidation.js";
import { render_processes } from "./process_table.js";
import { processes, generateProcess } from "./processes.js";

const arriveTime = document.getElementById("arrive-time");
const duration = document.getElementById("duration");
const submitNewProcess = document.getElementById("process-adder");

submitNewProcess.addEventListener("click", () => {
  if (!arriveTime.value || !duration.value) {
    return;
  }
  processes.push(generateProcess(arriveTime.value, duration.value));
  render_processes(processes);
});

arriveTime.addEventListener("input", () => correctInputSize(arriveTime));
allowNumbersOnly(arriveTime);
duration.addEventListener("input", () => correctInputSize(duration));
allowNumbersOnly(duration);

export { processes };
