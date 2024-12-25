const arriveTime = document.getElementById("arrive-time");
const duration = document.getElementById("duration");
const submitNewProcess = document.getElementById("process-adder");
const processTable = document.getElementById("process-table-body");
let processes = [];

const correctInputSize = (input) => {
  console.log(input.value);
  if (input.value.length > 2) {
    input.value = input.value.slice(0, 2);
  }
};

const allowNumbersOnly = (inputElement) => {
  inputElement.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Enter" || key === "Tab" || key === "Backspace") {
      return;
    }
    if (!/^[0-9]$/.test(key)) {
      e.preventDefault();
    }
  });
};

const generate_random_color = () => {
  const minColorValue = 100;
  const r = Math.floor(Math.random() * (256 - minColorValue) + minColorValue);
  const g = Math.floor(Math.random() * (256 - minColorValue) + minColorValue);
  const b = Math.floor(Math.random() * (256 - minColorValue) + minColorValue);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateProcess = (start, duration) => {
  return {
    name: `P${processes.length}`,
    start: start,
    duration: duration,
    color: generate_random_color(),
  };
};

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
  colorCell.style.backgroundColor = process.color;
  row.appendChild(colorCell);

  return row;
};

const reEvaluateTable = () => {
  processes.sort((a, b) => a.start - b.start); // sort based on start so we know start from where
  processes.forEach((process, idx) => {
    process.name = `P${idx}`;
  });
};

const render_processes = () => {
  processTable.innerHTML = "";
  reEvaluateTable();
  processes.forEach((process) => {
    processTable.appendChild(createNewRow(process));
  });
};

arriveTime.addEventListener("input", () => correctInputSize(arriveTime));
allowNumbersOnly(arriveTime);
duration.addEventListener("input", () => correctInputSize(duration));
allowNumbersOnly(duration);

submitNewProcess.addEventListener("click", () => {
  if (!arriveTime.value || !duration.value) {
    console.log("sowwy");
    return;
  }
  processes.push(generateProcess(arriveTime.value, duration.value));
  render_processes();
  console.log(
    `process is submited with start of ${arriveTime.value} and ${duration.value}`
  );
});
