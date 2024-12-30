import { FCFS } from "./FCFS.js";
import { RR } from "./RR.js";
import { SRTF } from "./SRTF.js";
import { SPN } from "./SPN.js";

const policies = ["FCFS", "SRTF", "RR", "SPN"];
const policy = document.getElementById("policy-heading");
let currentHeadingIndex = 0;

const switchPolicy = () => {
  policy.classList.add("flip-out");
  setTimeout(() => {
    currentHeadingIndex = (currentHeadingIndex + 1) % policies.length;
    const nextPolicyText = policies[currentHeadingIndex];
    policy.innerText = nextPolicyText;
    policy.classList.remove("flip-out");
    policy.classList.add("flip-in");
  }, 500);
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
      return null;
  }
};

policy.addEventListener("click", switchPolicy);

export { whatPolicy };
