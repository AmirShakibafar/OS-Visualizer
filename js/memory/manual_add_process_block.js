import { twoDigitNumberBox } from "../helpers/inputValidation.js";
import { createMemoryBlock } from "./memory_block.js";
import { addToMemoryBlocks } from "./memory_blocks.js";
import { renderAllTables } from "./hub_memory_process_table.js";

const blockSize = document.getElementById("size");
const blockArrive = document.getElementById("arrive-time");
const blockDuration = document.getElementById("duration");
const submitNewProcess = document.getElementById("process-adder");

twoDigitNumberBox(blockSize)
twoDigitNumberBox(blockArrive)
twoDigitNumberBox(blockDuration)

const submitHandler = () => {
  if (!blockSize.value || !blockArrive.value || !blockDuration.value) {
    return;
  }
  const memoryBlock = createMemoryBlock(
    blockArrive.value,
    blockSize.value,
    blockDuration.value
  );
  addToMemoryBlocks(memoryBlock);
  renderAllTables();
};
submitNewProcess.addEventListener("click", submitHandler);
