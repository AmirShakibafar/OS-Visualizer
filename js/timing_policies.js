import { FCFS } from "./FCFS.js";
import { RR } from "./RR.js";
import { SRTF } from "./srtf.js";
import { SPN } from "./spn.js";
const policies = ["FCFS", "SRTF", "RR", "SPN"];
const policy = document.getElementById("policy-heading");
let currentHeadingIndex = 0;

const switchPolicy = () => {
  currentHeadingIndex = (currentHeadingIndex + 1) % policies.length;
  policy.innerText = policies[currentHeadingIndex];
};

const whatPolicy = () => {
    switch (policy.innerText) {
        case "FCFS":
            return FCFS;
        case "SRTF":
            return SRTF;
        case "SPN":
            return SPN;
        case "RR":
            return RR;
        default:
            return "Unknown policy. Please provide a valid scheduling policy.";
    }
};

policy.addEventListener("click", switchPolicy);

export {whatPolicy};