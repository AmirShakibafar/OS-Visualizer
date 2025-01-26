import { generate_random_color, generateAccentColor } from "../helpers/helpers.js";
import { render_processes } from "./process_table.js";
import { render_mobile_processes } from "./mobile_table_add.js";
let processes = [];

const generateProcess = (start, duration) => {
  const bgcolor = generate_random_color();
  const color = generateAccentColor(bgcolor);
  return {
    name: `P${processes.length}`,
    start: start,
    duration: duration,
    bgcolor: bgcolor,
    color: color,
  };
};

const clearProcesses = () => {
  processes = [];
};

const removeProcess = (name, row) => {
  const index = processes.findIndex(proc => proc.name === name);
  if (index !== -1) {
    processes.splice(index, 1);
    row.remove();
  }
  render_mobile_processes(processes);
  render_processes(processes);
};

export { processes, generateProcess, clearProcesses, removeProcess };
