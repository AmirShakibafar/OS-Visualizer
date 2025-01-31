import { renderMemorySections } from "./memory_table.js";
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
const clearLastAllocatedIndex = () => {
  lastAllocatedIndex = 0;
};

const findNextFit = async (processBlock) => {
  const memorySpaces = getMemorySpaces();

  let startIndex = lastAllocatedIndex;

  if (readIsCancelled()){
    clearLastAllocatedIndex()
    return
  };

  while (startIndex < memorySpaces.length) {
    if (readIsCancelled()){
      clearLastAllocatedIndex()
      return
    };

    if (!memorySpaces[startIndex]) {
      break;
    }
    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(SPEED);

    if (checkIfRangeEmpty(startIndex, processBlock.blockSize)) {
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
    if (readIsCancelled()){
      clearLastAllocatedIndex()
      return
    };

    if (!memorySpaces[startIndex]) {
      break;
    }

    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(SPEED);

    if (checkIfRangeEmpty(startIndex, processBlock.blockSize)) {

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
  return;
};

const executeNextFit = async () => {
  clearLastAllocatedIndex();
  await Display("next_fit");
};

export { executeNextFit, findNextFit };
