const processTable = document.getElementById("process-table-body");

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
  
  const reEvaluateTable = (processes) => {
    processes.sort((a, b) => a.start - b.start); // sort based on start so we know start from where
    processes.forEach((process, idx) => {
      process.name = `P${idx}`;
    });
    return processes;
  };
  
  const render_processes = (processes) => {
    processTable.innerHTML = "";
    processes = reEvaluateTable(processes);
    processes.forEach((process) => {
      processTable.appendChild(createNewRow(process));
    });
};

export {render_processes};