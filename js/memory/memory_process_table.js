const memoryTable = document.getElementById("memory-process-table-body");

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

  return row;
};
