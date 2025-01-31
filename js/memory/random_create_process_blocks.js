import { oneDigitNumberBox } from "../helpers/inputValidation.js";
import { addToMemoryBlocks } from "./memory_blocks.js";
import { renderAllTables } from "./hub_memory_process_table.js";
import { createMemoryBlock } from "./memory_block.js";
const submitRandomProcesses = document.getElementById(
  "proccess-generator"
);

const amount = document.getElementById("amount-box");
oneDigitNumberBox(amount)

const addRandomMemoryBlocks = (
  amount,
  arrivalRange = [1, 30],
  sizeRange = [1, 16],
  durationRange = [1, 20]
) => {
  for (let i = 0; i < amount; i++) {
    const arrival =
      Math.floor(Math.random() * (arrivalRange[1] - arrivalRange[0] + 1)) +
      arrivalRange[0];
    const size =
      Math.floor(Math.random() * (sizeRange[1] - sizeRange[0] + 1)) +
      sizeRange[0];
    const duration =
      Math.floor(Math.random() * (durationRange[1] - durationRange[0] + 1)) +
      durationRange[0];
    const newBlock = createMemoryBlock(arrival, size, duration);
    addToMemoryBlocks(newBlock);
  }
};

const addRandomBlocksHandler = () => {
  if (!amount.value) {
    return;
  }
  addRandomMemoryBlocks(amount.value);
  renderAllTables();
};

submitRandomProcesses.addEventListener("click", addRandomBlocksHandler);
