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

let currentSpeed = 200;

const setAnimationSpeed = (newSpeed) => {
  currentSpeed = newSpeed;
};

const findBestFit = async (processBlock, isCancelled) => {
  const memorySpaces = getMemorySpaces();
  let bestFitIndex = -1;
  let bestFitSize = Infinity;

  for (let startIndex = 0; startIndex < memorySpaces.length; startIndex++) {
    if (isCancelled()) return;

    if (
      startIndex + processBlock.blockSize <= memorySpaces.length &&
      checkIfRangeEmpty(startIndex, processBlock.blockSize)
    ) {
      const fitSize = processBlock.blockSize;

      if (fitSize < bestFitSize) {
        bestFitSize = fitSize;
        bestFitIndex = startIndex;
      }
    }
  }

  
  if (bestFitIndex !== -1) {
    updateHoverState(bestFitIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

    allocateMemorySpace(bestFitIndex, processBlock);
    updateHoverState(bestFitIndex, processBlock.blockSize, false);
    renderMemorySections();
    return;
  }

  showMessage(
    `No available memory block found for ${processBlock.name}!`,
    "fail"
  );
  await sleep(500);
};

const executeBestFit = async (isCancelled) => {
  const processBlocks = getMemoryBlocks();
  clearMemorySpaces();
  resetTime();
  let currTick = 0;

  for (const process of processBlocks) {
    while (currTick < process.blockArrival) {
      if (isCancelled()) return;
      let mustGetDeAllocated = deAllocateMemorySpace(currTick);
      while (mustGetDeAllocated) {
        if (isCancelled()) return;
        await sleep(currentSpeed);
        mustGetDeAllocated = deAllocateMemorySpace(currTick);
        renderMemorySections();
      }

      currTick++;
      updateTime(currTick);
      await sleep(currentSpeed);
    }
    if (isCancelled()) return;
    await findBestFit(process, isCancelled);
    updateTime(currTick);
    await sleep(currentSpeed);
  }

  while (true) {
    if (isCancelled()) return;
    let mustGetDeAllocated = deAllocateMemorySpace(currTick);
    const activeProcesses = getMemorySpaces().some((space) => space.isActive);
    if (!activeProcesses) {
      break;
    }

    while (mustGetDeAllocated) {
      if (isCancelled()) return;
      await sleep(currentSpeed);
      mustGetDeAllocated = deAllocateMemorySpace(currTick);
      renderMemorySections();
    }

    currTick++;
    updateTime(currTick);
    await sleep(currentSpeed);
  }
};

export { findBestFit, executeBestFit, setAnimationSpeed };
