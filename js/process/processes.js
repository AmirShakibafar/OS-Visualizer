import { generate_random_color, generateAccentColor } from "../helpers/helpers.js";
let processes = [];

const getProcesses = () => {
  return processes
};

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
};

const reOrderProcesses = () => {
  processes.sort((a, b) => a.start - b.start);
  processes.forEach((process, idx) => {
    process.name = `P${idx}`;
  });
};

export { getProcesses, generateProcess, clearProcesses, removeProcess, reOrderProcesses };

export{ processes } // we need it for test 
