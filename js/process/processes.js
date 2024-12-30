import { generate_random_color, generateAccentColor } from "../helpers/helpers.js";

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
export { processes, generateProcess, clearProcesses };
