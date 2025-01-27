import { renderMemorySections } from "./memory_table.js";
import { showMessage } from "../helpers/message.js";
import {
  getMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
} from "./memory_space.js";
import { sleep } from "../helpers/helpers.js";
import { SPEED } from "../helpers/speed.js";
import { Display } from "./display.js";
import { readIsCancelled } from "../helpers/cancelFlag.js";


let lastAllocatedIndex = 0;


const findNextFit = async (processBlock) => {
  const memorySpaces = getMemorySpaces();

  let startIndex = lastAllocatedIndex;

  if (readIsCancelled()) return;

  while (startIndex < memorySpaces.length) {
    if (readIsCancelled()) return;

    if (!memorySpaces[startIndex]) {
      console.error(`Error: memorySpaces[${startIndex}] is undefined`);
      break;
    }
    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(SPEED);
    

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
    if (readIsCancelled()) return;

    if (!memorySpaces[startIndex]) {
      console.error(`Error: memorySpaces[${startIndex}] is undefined`);
      break;
    }

    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(SPEED);
    

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


const executeNextFit = async () => {
 await Display("next_fit")
};

export {executeNextFit, findNextFit};