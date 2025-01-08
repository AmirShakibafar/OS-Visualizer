const tableOne = document.getElementById("table-1");
const tableTwo = document.getElementById("table-2");
const memorySpaces = [];

// Generate a memory block object
const generate_memory_block = (number) => {
    return { number: number, processName: "empty", isFull: false, isActive: false };
};

// Create the memory section (initialize memorySpaces)
const create_memory_section = () => {
    for (let i = 0; i < 64; i++) {
        memorySpaces.push(generate_memory_block(i + 1));
    }
};

// Create a table row element for a memory block
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

// Display the memory sections in the tables
const show_memory_sections = () => {
    // Clear the tables
    tableOne.querySelector("tbody").innerHTML = "";
    tableTwo.querySelector("tbody").innerHTML = "";

    // Populate the tables with memory spaces
    memorySpaces.forEach((memoryBlock, index) => {
        const row = create_table_element(memoryBlock);
        if (index < Math.ceil(memorySpaces.length / 2)) {
            tableOne.querySelector("tbody").appendChild(row);
        } else {
            tableTwo.querySelector("tbody").appendChild(row);
        }
    });
};

// Initialize and display memory sections
create_memory_section();
show_memory_sections();
export {
    show_memory_sections, memorySpaces
}