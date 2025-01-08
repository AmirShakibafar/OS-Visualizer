const tableOne = document.getElementById("table-1");
const tableTwo = document.getElementById("table-2");
const memorySpaces = [];

const generate_memory_block = (number) => {
    return { number: number, processName: "empty", isFull: false, isActive: false };
};

const create_memory_section = () => {
    for (let i = 0; i < 64; i++) {
        memorySpaces.push(generate_memory_block(i + 1));
    }
};

const create_table_element = (memoryBlock) => {
    const row = document.createElement("tr");
    const cellNumber = document.createElement("td");
    const cellProcessName = document.createElement("td");

    cellNumber.textContent = memoryBlock.number;
    cellProcessName.textContent = memoryBlock.processName;
    cellProcessName.classList.add("memory-cell");

    if (memoryBlock.isActive) {
        row.classList.add("active");
    }

    row.appendChild(cellNumber);
    row.appendChild(cellProcessName);
    return row;
};

const show_memory_sections = () => {
    tableOne.querySelector("tbody").innerHTML = "";
    tableTwo.querySelector("tbody").innerHTML = "";

    memorySpaces.forEach((memoryBlock, index) => {
        const row = create_table_element(memoryBlock);
        if (index < Math.ceil(memorySpaces.length / 2)) {
            tableOne.querySelector("tbody").appendChild(row);
        } else {
            tableTwo.querySelector("tbody").appendChild(row);
        }
    });
};

create_memory_section();
show_memory_sections();
export {
    show_memory_sections, memorySpaces
}