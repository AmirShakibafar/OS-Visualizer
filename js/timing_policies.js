const policies = ["FCFS", "SRTF", "Rr", "SPN"];
const policy = document.getElementById("policy-heading");
let currentHeadingIndex = 0;

const switchPolicy = () => {
  currentHeadingIndex = (currentHeadingIndex + 1) % policies.length;
  policy.innerText = policies[currentHeadingIndex];
};

policy.addEventListener("click", switchPolicy);
