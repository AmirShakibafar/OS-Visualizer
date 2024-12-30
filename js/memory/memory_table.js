const tableOne = document.getElementById("table-1");
const tableTwo = document.getElementById("table-2");
const memorySpaces = [];

const generate_memory_block = (number) => {
    return { number: number, processName: "empty", isFull:false};
};

const create_memory_section = () => {
    for (let i = 0; i < 16; i++) {
        memorySpaces.push(generate_memory_block(i + 1));
    }
};

const create_table_element = (memoryBlock) => {
    const row = document.createElement("tr");
    const cellNumber = document.createElement("td");
    const cellProcessName = document.createElement("td");

    cellNumber.textContent = memoryBlock.number;
    cellProcessName.textContent = memoryBlock.processName;

    row.appendChild(cellNumber);
    row.appendChild(cellProcessName);
    return row;
}
const show_memory_sections = () => {
    tableOne.innerHTML = "";
    tableTwo.innerHTML = "";

    memorySpaces.forEach((memoryBlock, index) => {
        const row = create_table_element(memoryBlock);
        if (index < Math.ceil(memorySpaces.length / 2)) {
            tableOne.appendChild(row);
        } else {
            tableTwo.appendChild(row);
        }
    });
};

create_memory_section();
show_memory_sections();
