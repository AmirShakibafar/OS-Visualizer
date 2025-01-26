import { clearProcesses, removeProcess } from "./processes.js";
import { cardsContainer } from "./mobile_table_add.js";
// import { processes } from "./processes.js";
const processTable = document.getElementById("process-table-body");
// const resetTableButton = document.getElementById("reset-table-button");

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
  colorCell.style.backgroundColor = process.bgcolor;
  row.appendChild(colorCell);

  const deleteCell = document.createElement("td");
  deleteCell.textContent = "delete";
  deleteCell.classList.add("delete");
  deleteCell.style.cursor = "pointer";
  deleteCell.onclick = () => removeProcess(process.name, row);
  row.appendChild(deleteCell);

  return row;
};

const reEvaluateTable = (processes) => {
  processes.sort((a, b) => a.start - b.start);
  processes.forEach((process, idx) => {
    process.name = `P${idx}`;
  });
  return processes;
};

const render_processes = (processes) => {
  processTable.innerHTML = "";
  if (processes.length) {
    const deleteAllRow = document.createElement("tr");
    deleteAllRow.innerHTML = `
    <td colspan="5">
      Delete All
    </td>
  `;
    deleteAllRow.addEventListener("click", () => {
      clearProcesses();
      processTable.innerHTML = "";
      cardsContainer.innerHTML = "";
    });
    processTable.prepend(deleteAllRow);
  }
  processes = reEvaluateTable(processes);
  processes.forEach((process) => {
    processTable.appendChild(createNewRow(process));
  });
};

export { render_processes, reEvaluateTable, processTable };
