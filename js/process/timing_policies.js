import { FCFS } from "./FCFS.js";
import { RR } from "./RR.js";
import { SRTF } from "./SRTF.js";
import { SPN } from "./SPN.js";
import { HRRN } from "./HRRN.js";
import { resetContextInputBox } from "./context_switch.js";
import {
  deactivateInputBox,
  activateInputBox,
  resetQuantomInputBox,
} from "./quantom_input.js";

const policy = document.getElementById("algorithm-select");


policy.addEventListener("change", (event) => {
  if(event.target.value === "RR") activateInputBox();
  else{
    resetQuantomInputBox();
    deactivateInputBox();
  }
});


const policyMap = {
  FCFS,
  SRTF,
  SPN,
  RR,
  HRRN,
};

const whatPolicy = () => policyMap[policy.value] || null;


export { whatPolicy };
