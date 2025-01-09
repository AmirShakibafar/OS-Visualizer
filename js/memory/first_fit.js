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
      return true;
    }

    updateHoverState(startIndex, processBlock.blockSize, false);
    renderMemorySections();
    startIndex++;
  }

  showMessage("No available memory block found!", "fail");
  return false; 
};

const executeFirstFit = async (animationDelay = 200) => {
  const processBlocks = getMemoryBlocks();
  clearMemorySpaces();
  let currTick = 0;

  for (const process of processBlocks) {
    await sleep(400);
    while (currTick < process.blockArrival) {
      deAllocateMemorySpace(currTick);
      renderMemorySections();
      await sleep(animationDelay);
      currTick++;
    }
    const allocated = await findFirstFit(process, animationDelay);
    if (!allocated) {
      console.error(`Failed to allocate memory for process: ${process.name}`);
    }
  }
};

export { findFirstFit, executeFirstFit };
