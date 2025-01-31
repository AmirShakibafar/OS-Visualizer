import { executeFirstFit } from "./first_fit.js";
import { executeBestFit } from "./best_fit.js";
import { executeWorstFit } from "./worst_fit.js";
import { executeNextFit } from "./next_fit.js";
const policy = document.getElementById("algorithm-select");

const policyMap = {
  "First-Fit":executeFirstFit,
  "Best-Fit":executeBestFit,
  "Worst-Fit":executeWorstFit,
  "Next-Fit":executeNextFit,
};

const whatPolicy = () => {
  console.log(policy.value)
  return policyMap[policy.value] || null;
};


export { whatPolicy };