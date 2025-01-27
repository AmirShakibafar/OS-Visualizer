import { oneDigitNumberBox} from "../helpers/inputValidation.js";


const quantomInput = document.getElementById("time-quantom");
oneDigitNumberBox(quantomInput);

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