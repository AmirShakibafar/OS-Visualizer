import { allowNumbersOnly, correctInputSize } from "./inputValidation.js";
import { generate_random_color, generateAccentColor } from "./helpers.js";
import { render_processes } from "./process_table.js";

const arriveTime = document.getElementById("arrive-time");
const duration = document.getElementById("duration");
const submitNewProcess = document.getElementById("process-adder");
let processes = [];

const generateProcess = (start, duration) => {
  const bgcolor = generate_random_color()
  const color = generateAccentColor(bgcolor)
  return {
    name: `P${processes.length}`,
    start: start,
    duration: duration,
    bgcolor: bgcolor,
    color: color,
  };
};

arriveTime.addEventListener("input", () => correctInputSize(arriveTime));
allowNumbersOnly(arriveTime);
duration.addEventListener("input", () => correctInputSize(duration));
allowNumbersOnly(duration);

submitNewProcess.addEventListener("click", () => {
  if (!arriveTime.value || !duration.value) {
    return;
  }
  processes.push(generateProcess(arriveTime.value, duration.value));
  render_processes(processes);
});

export {processes}