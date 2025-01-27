import { twoDigitNumberBox } from "../helpers/inputValidation.js";
import { createMemoryBlock } from "./memory_block.js";
import { addToMemoryBlocks } from "./memory_blocks.js";
import { renderMemoryTable } from "./memory_process_table.js";
import { render_mobile_table } from "./mobile_table.js";
import { showMessage } from "../helpers/message.js";

const blockSize = document.getElementById("block-size");
const blockArrive = document.getElementById("block-arrival");
const blockDuration = document.getElementById("block-duration");
const submitNewProcess = document.getElementById("process-block-adder");

twoDigitNumberBox(blockSize)
twoDigitNumberBox(blockArrive)
twoDigitNumberBox(blockDuration)

const submitHandler = () => {
  if (!blockSize.value || !blockArrive.value || !blockDuration.value) {
    showMessage("you have empty fields!", "fail");
    return;
  }
  const memoryBlock = createMemoryBlock(
    blockArrive.value,
    blockSize.value,
    blockDuration.value
  );
  addToMemoryBlocks(memoryBlock);
  renderMemoryTable();
  render_mobile_table();
};
submitNewProcess.addEventListener("click", submitHandler);
