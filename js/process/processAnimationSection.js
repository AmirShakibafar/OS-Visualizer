import { whatPolicy } from "./timing_policies.js";
import { ShowAvgResponseTime } from "./avgResponseTimeCalculator.js";
import { ShowAvgWaitTime } from "./avgWaitTimeCalculator.js";
import { getProcesses } from "./processes.js";
import { setAnimationSpeed } from "../helpers/speed.js";
const tableBody = document
  .getElementById("dynamic_table")
  .querySelector("tbody");

const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
const speedSlider = document.getElementById("speed-range");

let SPEED = 1050 - speedSlider.value;
const updateSPEED = () => {
  SPEED = 1050 - speedSlider.value;
  setAnimationSpeed(SPEED);
}
updateSPEED();
speedSlider.addEventListener("input", updateSPEED);

const maxCellsPerRow = 10;
let currentRow = null;
let cellCount = 0;
let isCancelled = false;

const get_next_block = (process, time) => {
  if (!currentRow || cellCount % maxCellsPerRow === 0) {
    currentRow = document.createElement("tr");
    tableBody.appendChild(currentRow);
  }

  const newCell = document.createElement("td");
  newCell.textContent = `${time}:${process.name}`;
  newCell.style.backgroundColor = process.bgcolor;
  newCell.style.color = process.color;
  newCell.style.borderColor = process.bgcolor;
  newCell.style.fontSize = "14px";
  newCell.style.textAlign = "center";
  newCell.style.whiteSpace = "nowrap";
  newCell.style.width = "10vw";
  newCell.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.15)";
  cellCount++;
  currentRow.appendChild(newCell);
};

const resetTableSettings = () => {
  currentRow = null;
  cellCount = 0;
  tableBody.innerHTML = "";
  ShowAvgWaitTime(0);
  ShowAvgResponseTime(0);
};

playButton.addEventListener("click", async () => {
  if (!getProcesses().length) return;
  resetTableSettings();
  isCancelled = false;
  playButton.disabled = true;
  const policy = whatPolicy();
  await policy(getProcesses());
  playButton.disabled = false;
});

resetButton.addEventListener("click", () => {
  isCancelled = true;
  resetTableSettings();
});

export {isCancelled, get_next_block, ShowAvgWaitTime, ShowAvgResponseTime };
