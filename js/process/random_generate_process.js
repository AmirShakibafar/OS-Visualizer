import { processes, generateProcess, clearProcesses } from "./processes.js";
import { render_processes } from "./process_table.js";
import { correctInputSize, allowNumbersOnly } from "../helpers/inputValidation.js";

const amountBox = document.getElementById("amount-box");
const randomSubmitButton = document.getElementById("proccess-generator");

const generate_start_duration = () => {
    const start = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    const duration = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    return [start, duration]
}
const generate_random_processes = (amount) => {
    clearProcesses();
    for (let i=0; i < amount; i++) {
        let [start, duration] = generate_start_duration();
        processes.push(generateProcess(start, duration));
    }

};
amountBox.addEventListener("input", () => correctInputSize(amountBox));
allowNumbersOnly(amountBox);
randomSubmitButton.addEventListener("click", () => {
    if (!amountBox) {
        return;
    }
    generate_random_processes(amountBox.value);
    render_processes(processes);
});


export { generate_start_duration, generate_random_processes }