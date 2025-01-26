import { allowNumbersOnly, correctInputSize } from "../helpers/inputValidation.js";
import { render_processes } from "./process_table.js";
import { processes, generateProcess } from "./processes.js";
import { render_mobile_processes } from "./mobile_table_add.js";
const arriveTime = document.getElementById("arrive-time");
const duration = document.getElementById("duration");
const submitNewProcess = document.getElementById("process-adder");

submitNewProcess.addEventListener("click", () => {
  if (!arriveTime.value || !duration.value) {
    return;
  }
  processes.push(generateProcess(arriveTime.value, duration.value));
  render_processes(processes);
  render_mobile_processes(processes);
});

arriveTime.addEventListener("input", () => correctInputSize(arriveTime));
allowNumbersOnly(arriveTime);
duration.addEventListener("input", () => correctInputSize(duration));
allowNumbersOnly(duration);

export { processes };
