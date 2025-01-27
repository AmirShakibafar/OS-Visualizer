import {oneDigitNumberBox} from "../helpers/inputValidation.js";
const contextSwitch = document.getElementById("context-switch");
oneDigitNumberBox(contextSwitch);

const getContextSwitch = () => {
    return Number(contextSwitch.value) || 0;
}

const resetContextInputBox = () => {
    contextSwitch.value = ""
}

export {getContextSwitch, resetContextInputBox}