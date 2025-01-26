import { allowNumbersOnly, correctInputSize } from "../helpers/inputValidation.js";
import {generateProcess, getProcesses} from "./processes.js";
import { renderOnTables } from "./hub_table.js";

const arriveTime = document.getElementById("arrive-time");
const duration = document.getElementById("duration");
const submitNewProcess = document.getElementById("process-adder");

arriveTime.addEventListener("input", () => correctInputSize(arriveTime));
allowNumbersOnly(arriveTime);
duration.addEventListener("input", () => correctInputSize(duration));
allowNumbersOnly(duration);

submitNewProcess.addEventListener("click", () => {
  if (!arriveTime.value || !duration.value) {
    return;
  }
  getProcesses().push(generateProcess(arriveTime.value, duration.value));
  renderOnTables();
});

