import {
    correctInputSize,
    allowNumbersOnly,
} from "../helpers/inputValidation.js";
import { addToMemoryBlocks} from "./memory_blocks.js";
import { renderMemoryTable } from "./memory_process_table.js";
import { createMemoryBlock } from "./memory_block.js";

const submitRandomProcesses = document.getElementById("random-proccess-generator");

const addRandomMemoryBlocks = (amount, arrivalRange = [1, 10], sizeRange = [1, 10], durationRange = [1, 5]) => {
  for (let i = 0; i < amount; i++) {
    const arrival = Math.floor(Math.random() * (arrivalRange[1] - arrivalRange[0] + 1)) + arrivalRange[0];
    const size = Math.floor(Math.random() * (sizeRange[1] - sizeRange[0] + 1)) + sizeRange[0];
    const duration = Math.floor(Math.random() * (durationRange[1] - durationRange[0] + 1)) + durationRange[0];
    const newBlock = createMemoryBlock(arrival, size, duration);
    addToMemoryBlocks(newBlock);
  }
};

const addRandomBlocksHandler = () => {
  const amount = document.getElementById("number-of-randoms");
  amount.addEventListener("input", () => correctInputSize(amount));
  allowNumbersOnly(amount);
  addRandomMemoryBlocks(amount.value);
  renderMemoryTable();
};

submitRandomProcesses.addEventListener("click", addRandomBlocksHandler);
