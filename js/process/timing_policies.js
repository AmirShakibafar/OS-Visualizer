import { FCFS } from "./FCFS.js";
import { RR } from "./RR.js";
import { SRTF } from "./SRTF.js";
import { SPN } from "./SPN.js";
import { HRRN } from "./HRRN.js";
import { resetContextInputBox } from "./context_switch.js";
import { deactivateInputBox, activateInputBox, resetQuantomInputBox } from "./quantom_input.js";

const policies = ["FCFS", "SRTF", "RR", "SPN", "HRRN"];
const policy = document.getElementById("policy-heading");

let currentHeadingIndex = 0;

const switchPolicy = () => {
  resetContextInputBox();
  resetQuantomInputBox();
  deactivateInputBox();

  policy.classList.add("flip-out");
  setTimeout(() => {
    currentHeadingIndex = (currentHeadingIndex + 1) % policies.length;
    const nextPolicyText = policies[currentHeadingIndex];

    if (nextPolicyText === "RR") activateInputBox();

    policy.innerText = nextPolicyText;
    policy.classList.replace("flip-out", "flip-in");
  }, 500);
};

const policyMap = {
  FCFS,
  SRTF,
  SPN,
  RR,
  HRRN,
};

const whatPolicy = () => policyMap[policy.innerText] || null;

policy.addEventListener("click", switchPolicy);

export { whatPolicy };
