import { ShowAvgResponseTime } from "./avgResponseTimeCalculator.js";
import { ShowAvgWaitTime } from "./avgWaitTimeCalculator.js";
const tableBody = document.querySelector("#dynamic_table tbody");

var MAX_CELLS_PER_ROW = 7;
let currentRow = null;
let cellCount = 0;

if( window.innerWidth < 610){
  MAX_CELLS_PER_ROW = 5;
}
if( window.innerWidth > 610 && window.innerWidth < 1070){
  MAX_CELLS_PER_ROW = 6;
}
if( window.innerWidth > 1070){
  MAX_CELLS_PER_ROW = 7;
}

const createTableCell = (process, time) => {
  const cell = document.createElement("td");
  cell.textContent = `${time}:${process.name}`;
  cell.classList.add("next-block");
  cell.style.backgroundColor = process.bgcolor;
  cell.style.color = process.color;
  cell.style.borderColor = process.bgcolor;

  return cell;
};

const getNextBlock = (process, time) => {
  if (!currentRow || cellCount % MAX_CELLS_PER_ROW === 0) {
    currentRow = document.createElement("tr");
    tableBody.appendChild(currentRow);
  }
  const newCell = createTableCell(process, time);
  currentRow.appendChild(newCell);
  cellCount++;
};

const resetTableSettings = () => {
  currentRow = null;
  cellCount = 0;
  tableBody.innerHTML = "";
  ShowAvgWaitTime(0);
  ShowAvgResponseTime(0);
};


export { getNextBlock, resetTableSettings };
