import { allowNumbersOnly, correctOneDigitInputSize } from "../helpers/inputValidation.js";
const contextSwitch = document.getElementById("context-switch");
contextSwitch.addEventListener("input", () => correctOneDigitInputSize(contextSwitch));
allowNumbersOnly(contextSwitch);

const getContextSwitch = () => {
    return Number(contextSwitch.value) || 0;
}

const resetContextInputBox = () => {
    contextSwitch.value = ""
}

export {getContextSwitch, resetContextInputBox}