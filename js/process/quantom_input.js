import { allowNumbersOnly, correctOneDigitInputSize } from "../helpers/inputValidation.js";


const quantomInput = document.getElementById("time-quantom");
quantomInput.addEventListener("input", correctOneDigitInputSize(quantomInput));
allowNumbersOnly(quantomInput);

const activateInputBox = () => {
    quantomInput.disabled = false;  
}

const deactivateInputBox = () => {
    quantomInput.disabled = true;   
}

const resetQuantomInputBox = () => {
    quantomInput.value = ""
}
export {
    deactivateInputBox,
    activateInputBox,
    resetQuantomInputBox,
    quantomInput
}