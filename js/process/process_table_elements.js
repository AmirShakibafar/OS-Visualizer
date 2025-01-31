import { clearProcesses, removeProcess } from "./processes.js";
import { renderOnTables } from "./hub_table.js";

const processTable = document.getElementById("process-table-body");
const cardsContainer = document.querySelector(".cards-container");
const mobileControls = document.getElementById("mobile-controls");
const mobileDeleteAll = document.getElementById("mobile-delete-all");
const mobileSection = document.getElementById("mobile-table-container")

const deleteOne = (process, row) => {
  removeProcess(process.name, row);
  renderOnTables();
};

const deleteAll = () => {
  clearProcesses();
  renderOnTables();
};

mobileDeleteAll.addEventListener("click", () => deleteAll());
const createNewRow = (process) => {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = process.name;
  row.appendChild(nameCell);

  const startCell = document.createElement("td");
  startCell.textContent = process.start;
  row.appendChild(startCell);

  const durationCell = document.createElement("td");
  durationCell.textContent = process.duration;
  row.appendChild(durationCell);

  const colorCell = document.createElement("td");
  const colorCircle = document.createElement("div");
  colorCircle.style.backgroundColor = process.bgcolor;
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


const createDeleteRow = () => {
  const deleteAllRow = document.createElement("tr");
  deleteAllRow.innerHTML = `
    <td colspan="5">
      Delete All
    </td>
  `;
  deleteAllRow.addEventListener("click", () => deleteAll());
  processTable.prepend(deleteAllRow);
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
  cardColor.style.backgroundColor = process.bgcolor;
  cardColor.style.color = process.color;
  cardColor.innerHTML = `<div class="card-title"><h3>${process.name}</h3></div>`;
  card.appendChild(cardColor);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  cardInfo.innerHTML = `<p>Arrival: ${process.start}</p><p>Duration: ${process.duration}</p>`;
  card.appendChild(cardInfo);

  return card;
};

export {
  createDeleteRow,
  createNewRow,
  createNewCard,
  processTable,
  cardsContainer,
  mobileControls,
  mobileDeleteAll,
  mobileSection
};
