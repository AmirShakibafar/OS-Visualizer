import {
  getMemoryBlocks,
  reArrangeMemoryBlocks,
  clearMemoryBlocks,
  deleteMemoryBlock,
} from "./memory_blocks.js";
import { memoryTable, renderMemoryTable } from "./memory_process_table.js";

const cardsContainer = document.querySelector(".cards-container");
const mobileControls = document.getElementById("mobile-controls");
const mobileDeleteAll = document.getElementById("mobile-delete-all");
const createNewCard = (process) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.onclick = () => {
    deleteMemoryBlock(process.name, card);
    reArrangeMemoryBlocks();
    render_mobile_table();
    renderMemoryTable();
};
  card.appendChild(deleteBtn);

  const cardColor = document.createElement("div");
  cardColor.classList.add("card-color");
  cardColor.style.backgroundColor = process.bgColor;
  cardColor.style.color = process.color;
  cardColor.innerHTML = `<div class="card-title"><h3>${process.name}</h3></div>`;
  card.appendChild(cardColor);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  cardInfo.innerHTML = `<p>Arrival: ${process.blockArrival}</p><p>Duration: ${process.blockExitTime - process.blockArrival}</p><p>Size: ${process.blockSize}</p>`;
  card.appendChild(cardInfo);

  return card;
};

const render_mobile_table = () => {
  cardsContainer.innerHTML = "";
  const processes = getMemoryBlocks();
  if (processes.length) {
    mobileControls.style.display = "block";
  } else {
    mobileControls.style.display = "none";
  }
  reArrangeMemoryBlocks();
  getMemoryBlocks().forEach((process) => {
    cardsContainer.appendChild(createNewCard(process));
  });
};

mobileDeleteAll.addEventListener("click", () => {
  clearMemoryBlocks();
  memoryTable.innerHTML = "";
  cardsContainer.innerHTML = "";
});

export { render_mobile_table, cardsContainer };
