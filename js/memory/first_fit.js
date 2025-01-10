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

const findFirstFit = async (processBlock, isCancelled) => {
  let startIndex = 0;
  const memorySpaces = getMemorySpaces();
  if (isCancelled()) return;
  while (startIndex + processBlock.blockSize <= memorySpaces.length) {
    if (isCancelled()) return;
    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

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

  showMessage(
    `No available memory block found for ${processBlock.name}!`,
    "fail"
  );
  await sleep(500);

  return;
};

const executeFirstFit = async (isCancelled) => {
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
    await findFirstFit(process, isCancelled);
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

export { findFirstFit, executeFirstFit, setAnimationSpeed };
