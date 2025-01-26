import { clearProcesses, removeProcess } from "./processes.js";
import { reEvaluateTable } from "./process_table.js";
import { processTable } from "./process_table.js";
const cardsContainer = document.querySelector(".cards-container");
const mobileControls = document.getElementById("mobile-controls");
const mobileDeleteAll = document.getElementById("mobile-delete-all");
const createNewCard = (process) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.onclick = () => removeProcess(process.name, card);
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

const render_mobile_processes = (processes) => {
  cardsContainer.innerHTML = "";
  if (processes.length) {
    mobileControls.style.display = "block";
  } else {
    mobileControls.style.display = "none";

  }
  processes = reEvaluateTable(processes);
  processes.forEach((process) => {
    cardsContainer.appendChild(createNewCard(process));
  });
};

mobileDeleteAll.addEventListener("click", () => {
  clearProcesses();
  processTable.innerHTML = "";
  cardsContainer.innerHTML = "";
});

export { render_mobile_processes, cardsContainer };
