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

const findFirstFit = async (processBlock, animationDelay = 200) => {
  let startIndex = 0;
  const memorySpaces = getMemorySpaces();

  while (startIndex + processBlock.blockSize <= memorySpaces.length) {
    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(animationDelay);

    if (checkIfRangeEmpty(startIndex, processBlock.blockSize)) {
      allocateMemorySpace(startIndex, processBlock);
      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
      return;
    }

    updateHoverState(startIndex, processBlock.blockSize, false);
    renderMemorySections();
    startIndex++;
  }

  showMessage("No available memory block found!", "fail");
  return;
};

const executeFirstFit = async (animationDelay = 200) => {
  const processBlocks = getMemoryBlocks();
  clearMemorySpaces();
  resetTime();
  let currTick = 0;

  for (const process of processBlocks) {
    while (currTick < process.blockArrival) {
      let mustGetDeAllocated = deAllocateMemorySpace(currTick);
      while (mustGetDeAllocated) {
        await sleep(animationDelay);
        mustGetDeAllocated = deAllocateMemorySpace(currTick);
        renderMemorySections();
      }

      currTick++;
      updateTime(currTick);
      await sleep(animationDelay);
    }

    await findFirstFit(process, animationDelay);
    updateTime(currTick);
    await sleep(animationDelay);
  }

  while (true) {
    let mustGetDeAllocated = deAllocateMemorySpace(currTick);

    const activeProcesses = getMemorySpaces().some((space) => space.isActive);
    if (!activeProcesses) {
      break;
    }

    while (mustGetDeAllocated) {
      await sleep(animationDelay);
      mustGetDeAllocated = deAllocateMemorySpace(currTick);
      renderMemorySections();
    }

    currTick++;
    updateTime(currTick);
    await sleep(animationDelay);
  }
};

export { findFirstFit, executeFirstFit };
