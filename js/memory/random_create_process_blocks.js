import {
  correctOneDigitInputSize,
  allowNumbersOnly,
} from "../helpers/inputValidation.js";
import { addToMemoryBlocks } from "./memory_blocks.js";
import { renderMemoryTable } from "./memory_process_table.js";
import { createMemoryBlock } from "./memory_block.js";
import { showMessage } from "../helpers/message.js";
const submitRandomProcesses = document.getElementById(
  "random-proccess-generator"
);
const amount = document.getElementById("number-of-randoms");
amount.addEventListener("input", () => correctOneDigitInputSize(amount));
allowNumbersOnly(amount);

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
    showMessage("input field is empty!", "fail");
    return;
  }
  showMessage("processes added succesfully!", "success");
  addRandomMemoryBlocks(amount.value);
  renderMemoryTable();
};

submitRandomProcesses.addEventListener("click", addRandomBlocksHandler);
