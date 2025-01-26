import { getProcesses, generateProcess, clearProcesses } from "./processes.js";
import { twoDigitNumberBox } from "../helpers/inputValidation.js";
import { renderOnTables } from "./hub_table.js";

// we need typeof document !== "undefined" to handle test cases
const amountBox =
  typeof document !== "undefined"
    ? document.getElementById("amount-box")
    : null;
const randomSubmitButton =
  typeof document !== "undefined"
    ? document.getElementById("proccess-generator")
    : null;

const generate_start_duration = () => {
  const start = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const duration = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  return [start, duration];
};

const generate_random_processes = (amount) => {
  clearProcesses();
  for (let i = 0; i < amount; i++) {
    let [start, duration] = generate_start_duration();
    getProcesses().push(generateProcess(start, duration));
  }
};

if (amountBox !== null) {
  twoDigitNumberBox(amountBox);
  randomSubmitButton.addEventListener("click", () => {
    if (!amountBox) {
      return;
    }
    generate_random_processes(amountBox.value);
    renderOnTables();
  });
}

export { generate_start_duration, generate_random_processes };
