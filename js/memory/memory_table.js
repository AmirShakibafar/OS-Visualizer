import { getMemorySpaces } from "./memory_space.js";
const tableOne = document.getElementById("table-1");
const tableTwo = document.getElementById("table-2");

const create_table_element = (memoryBlock, index) => {
  const row = document.createElement("tr");
  const cellNumber = document.createElement("td");
  const cellProcessName = document.createElement("td");

  cellNumber.textContent = index;
  cellProcessName.textContent = memoryBlock.processName || "empty";
  cellProcessName.classList.add("memory-cell");
  if (memoryBlock.bgColor) {
    row.style.backgroundColor = memoryBlock.bgColor;
  }
  if (memoryBlock.color) {
    row.style.color = memoryBlock.color;
  }

  if (memoryBlock.isActive) {
    row.classList.add("active");
  }

  row.appendChild(cellNumber);
  row.appendChild(cellProcessName);
  return row;
};

const renderMemorySections = () => {
  tableOne.querySelector("tbody").innerHTML = "";
  tableTwo.querySelector("tbody").innerHTML = "";
  const memorySpaces = getMemorySpaces();
  memorySpaces.forEach((memoryBlock, index) => {
    const row = create_table_element(memoryBlock, index);
    if (memoryBlock.isActive && memoryBlock.wasRecentlyAdded) {
      row.classList.add("fade-in");
      setTimeout(() => row.classList.remove("fade-in"), 500);
      memoryBlock.wasRecentlyAdded = false;
    }
    if (memoryBlock.isHovered) {
      row.childNodes[0].classList.add("hovered");
    } else {
      row.childNodes[0].classList.remove("hovered");
    }
    if (index < Math.ceil(memorySpaces.length / 2)) {
      tableOne.querySelector("tbody").appendChild(row);
    } else {
      tableTwo.querySelector("tbody").appendChild(row);
    }
  });
};

renderMemorySections();

export { renderMemorySections };
