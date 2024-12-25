const tableBody = document
  .getElementById("dynamic_table")
  .querySelector("tbody");
const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
const prevButton = document.getElementById("reset-button");
const nextButton = document.getElementById("reset-button");

const maxCellsPerRow = 10;
let currentRow = null;
let cellCount = 0;
let isCancelled = false;
let curr_tick = 0;

const get_next_block = (process, time) => {
  if (!currentRow || cellCount % maxCellsPerRow === 0) {
    currentRow = document.createElement("tr");
    tableBody.appendChild(currentRow);
  }

  const newCell = document.createElement("td");
  newCell.textContent = `${time}:${process.name}`;
  newCell.style.backgroundColor = process.color;
  newCell.style.borderColor = process.color;
  newCell.style.fontSize = "14px";
  newCell.style.textAlign = "center";
  newCell.style.whiteSpace = "nowrap";
  newCell.style.width = "100px";
  newCell.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.15)";
  cellCount++;
  currentRow.appendChild(newCell);
};


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

playButton.addEventListener("click", async () => {
  isCancelled = false;
  tableBody.innerHTML = "";
  playButton.disabled = true;
  await FCFS(processes);
  playButton.disabled = false;
});

resetButton.addEventListener("click", () => {
  isCancelled = true;
  tableBody.innerHTML = "";
  currentRow = null;
  cellCount = 0;
  curr_tick = 0;
});

prevButton.addEventListener("click", () => {
    if (cellCount >= processes.length || cellCount < 0) {
        return;
    }
    remove_block();
    console.log("hi")
});

nextButton.addEventListener("click", () => {
    if (cellCount >= processes.length || cellCount < 0) {
        return;
    }
    // get_next_block();

});
