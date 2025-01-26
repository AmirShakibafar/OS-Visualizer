import { getMemoryBlocks, reArrangeMemoryBlocks, clearMemoryBlocks, deleteMemoryBlock } from "./memory_blocks.js";
import { cardsContainer, render_mobile_table } from "./mobile_table.js";
const memoryTable = document.getElementById("memory-process-table-body");

const createNewRow = (process, processes) => {
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

  const deleteCell = document.createElement("td");
  deleteCell.textContent = "Delete";
  deleteCell.classList.add("delete");
  deleteCell.onclick = () => {
    deleteMemoryBlock(process.name, row);
    render_mobile_table();
  };
  row.appendChild(deleteCell);

  return row;
};

const renderMemoryTable = () => {
  memoryTable.innerHTML = "";
  if (getMemoryBlocks().length) {
    const deleteAllRow = document.createElement("tr");
    deleteAllRow.innerHTML = `
    <td colspan="6">
      Delete All
    </td>
  `;
    deleteAllRow.addEventListener("click", clearMemoryTable);
    memoryTable.prepend(deleteAllRow);
  }
  reArrangeMemoryBlocks();
  getMemoryBlocks().forEach((process) => {
    memoryTable.appendChild(createNewRow(process));
  });
};

const clearMemoryTable = () => {
  memoryTable.innerHTML = "";
  cardsContainer.innerHTML = "";
  clearMemoryBlocks();
}



export {renderMemoryTable, clearMemoryTable, memoryTable};