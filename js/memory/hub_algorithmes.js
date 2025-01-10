import { executeFirstFit } from "./first_fit.js";
import { executeBestFit } from "./best_fit.js";
const policies = ["FirstFit", "BestFit", "WorstFit"];
const policy = document.getElementById("memory-policy-heading");
let currentIndex = 0;

const switchPolicy = () => {
  policy.classList.add("flip-out");
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % policies.length;
    const nextPolicyText = policies[currentIndex];
    policy.innerText = nextPolicyText;
    policy.classList.remove("flip-out");
    policy.classList.add("flip-in");
  }, 500);
};

const whatPolicy = () => {
  switch (policy.innerText) {
    case "FirstFit":
      return executeFirstFit;
    case "BestFit":
      return executeBestFit;
    default:
      return null;
  }
};

policy.addEventListener("click", switchPolicy);

export { whatPolicy };
