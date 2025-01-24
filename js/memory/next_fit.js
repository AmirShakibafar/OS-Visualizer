import { renderMemorySections } from "./memory_table.js";
import { showMessage } from "../helpers/message.js";
import {
  getMemorySpaces,
  clearMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
  deAllocateMemorySpace,
} from "./memory_space.js";
import { getMemoryBlocks } from "./memory_blocks.js";
import { sleep } from "../helpers/helpers.js";
import { updateTime, resetTime } from "./timer.js";
import { currentSpeed } from "./speed.js";
import { Display } from "./display.js";

let lastAllocatedIndex = 0;


const findNextFit = async (processBlock, isCancelled) => {
  const memorySpaces = getMemorySpaces();

  let startIndex = lastAllocatedIndex;

  if (isCancelled()) return;

  while (startIndex < memorySpaces.length) {
    if (isCancelled()) return;

    if (!memorySpaces[startIndex]) {
      console.error(`Error: memorySpaces[${startIndex}] is undefined`);
      break;
    }
    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

    if (checkIfRangeEmpty(startIndex, processBlock.blockSize)) {
      showMessage(
        `Found empty block for ${processBlock.name} at index: ${startIndex}`,
        "success"
      );

      allocateMemorySpace(startIndex, processBlock);
      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
      lastAllocatedIndex = startIndex + processBlock.blockSize;
      return;
    }

    updateHoverState(startIndex, processBlock.blockSize, false);
    renderMemorySections();
    startIndex++;
  }

  startIndex = 0;
  while (startIndex < lastAllocatedIndex) {
    if (isCancelled()) return;

    if (!memorySpaces[startIndex]) {
      console.error(`Error: memorySpaces[${startIndex}] is undefined`);
      break;
    }

    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

    if (checkIfRangeEmpty(startIndex, processBlock.blockSize)) {
      showMessage(
        `Found empty block for ${processBlock.name} at index: ${startIndex}`,
        "success"
      );

      allocateMemorySpace(startIndex, processBlock);
      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
      lastAllocatedIndex = startIndex + processBlock.blockSize;
      return;
    }

    updateHoverState(startIndex, processBlock.blockSize, false);
    renderMemorySections();
    startIndex++;
  }

  showMessage(
    `No available memory block found for ${processBlock.name}!`,
    "fail"
  );
  await sleep(500);

  return;
};


const executeNextFit = async (isCancelled) => {
  Display(isCancelled, "next_fit")
};

export {executeNextFit, findNextFit};