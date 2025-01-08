import { getMemoryBlocks, reArrangeMemoryBlocks } from "./memory_blocks.js";
const memoryTable = document.getElementById("memory-process-table-body");

const createNewRow = (process) => {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = process.name;
  row.appendChild(nameCell);

  const arrivalCell = document.createElement("td");
  arrivalCell.textContent = process.blockArrival;
  row.appendChild(arrivalCell);

  const durationCell = document.createElement("td");
  durationCell.textContent = process.blockExitTime - process.blockArrival;
  row.appendChild(durationCell);

  const sizeCell = document.createElement("td");
  sizeCell.textContent = process.blockSize;
  row.appendChild(sizeCell);
  
  const colorCell = document.createElement("td");
  colorCell.style.backgroundColor = process.bgColor;
  row.appendChild(colorCell);

  return row;
};

const renderMemoryTable = () => {
  memoryTable.innerHTML = "";
  reArrangeMemoryBlocks();
  getMemoryBlocks().forEach((process) => {
    memoryTable.appendChild(createNewRow(process));
  });
};

export {renderMemoryTable};