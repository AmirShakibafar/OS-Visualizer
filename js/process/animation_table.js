import { processes } from "./manual_add_process.js";
import { whatPolicy } from "./timing_policies.js";
const waitInfo = document.getElementById("average-result-box");
const responseInfo = document.getElementById("response-result-box");
const tableBody = document
  .getElementById("dynamic_table")
  .querySelector("tbody");
const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
const speedSlider = document.getElementById("speed-range");
const contextSwitch = document.getElementById("context-switch");

let SPEED = 1050 - speedSlider.value;
speedSlider.addEventListener("input", () => {
  SPEED = 1050 - speedSlider.value;
});

const maxCellsPerRow = 10;
let currentRow = null;
let cellCount = 0;
let isCancelled = false;

const ShowAvgWaitTime = (time) => {
  time = parseFloat(time.toFixed(2));
  waitInfo.textContent = `Average Wait Time: ${time}`;
};

const ShowAvgResponseTime = (time) => {
  time = parseFloat(time.toFixed(2));
  responseInfo.textContent = `Average Response Time: ${time}`;
};

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
  newCell.style.width = "100px";
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
  if (!processes.length) {
    return;
  }
  resetTableSettings();
  isCancelled = false;
  playButton.disabled = true;
  const policy = whatPolicy();
  await policy(processes);
  playButton.disabled = false;
});

resetButton.addEventListener("click", () => {
  isCancelled = true;
  resetTableSettings();
});

export { isCancelled, get_next_block, SPEED, ShowAvgWaitTime, ShowAvgResponseTime };
