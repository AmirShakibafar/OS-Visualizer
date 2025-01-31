import {
  getMemoryBlocks,
  reArrangeMemoryBlocks,
  clearMemoryBlocks,
  deleteMemoryBlock,
} from "./memory_blocks.js";
import { renderMemoryTable } from "./memory_process_table.js";
import { renderMobileTable } from "./mobile_process_table.js";
const cardsContainer = document.querySelector(".cards-container");
const mobileControls = document.getElementById("mobile-controls");
const mobileDeleteAll = document.getElementById("mobile-delete-all");
const memoryTable = document.getElementById("process-table-body");
const mobileSection = document.getElementById("mobile-table-container")

const deleteAll = () => {
  clearMemoryBlocks();
  renderMobileTable();
  renderMemoryTable();
  mobileSection.style.border = "none";
};

const deleteOne = (process, card) => {
  deleteMemoryBlock(process.name, card);
  reArrangeMemoryBlocks();
  renderMobileTable();
  renderMemoryTable();
};

const showOrHideButton = () => {
  if (getMemoryBlocks().length) {
    mobileControls.style.display = "block";
  } else {
    mobileControls.style.display = "none";
  }
};

const deleteAllRowButton = () => {
  const deleteAllRow = document.createElement("tr");
  deleteAllRow.innerHTML = `
      <td colspan="6">
        Delete All
      </td>
    `;
  deleteAllRow.addEventListener("click", deleteAll);
  memoryTable.prepend(deleteAllRow);
};

 mobileDeleteAll.addEventListener("click", deleteAll);

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
  const colorCircle = document.createElement("div");
  colorCircle.style.backgroundColor = process.bgColor;
  colorCircle.style.width = "20px";  
  colorCircle.style.height = "20px";
  colorCircle.style.borderRadius = "50%"; 
  colorCircle.style.margin = "auto"; 

  colorCell.appendChild(colorCircle);
  row.appendChild(colorCell);

  const deleteCell = document.createElement("td");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "images/trash-2.svg";  
  deleteIcon.alt = "Delete";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.width = "25px"; 
  deleteIcon.style.height = "25px";
  deleteIcon.onclick = () => deleteOne(process, row);

  deleteCell.appendChild(deleteIcon);
  row.appendChild(deleteCell);

  return row;
};

const createNewCard = (process) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.onclick = () => deleteOne(process, card);
  card.appendChild(deleteBtn);

  const cardColor = document.createElement("div");
  cardColor.classList.add("card-color");
  cardColor.style.backgroundColor = process.bgColor;
  cardColor.style.color = process.color;
  cardColor.innerHTML = `<div class="card-title"><h3>${process.name}</h3></div>`;
  card.appendChild(cardColor);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  cardInfo.innerHTML = `<p>Arrival: ${process.blockArrival}</p><p>Duration: ${
    process.blockExitTime - process.blockArrival
  }</p><p>Size: ${process.blockSize}</p>`;
  card.appendChild(cardInfo);
  return card;
};

export {
  createNewCard,
  createNewRow,
  deleteAllRowButton,
  showOrHideButton,
  cardsContainer,
  memoryTable,
  mobileSection
};
