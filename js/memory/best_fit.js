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
      updateHoverState(startIndex, processBlock.blockSize, true);
      renderMemorySections();
      await sleep(currentSpeed);

      const fitSize = processBlock.blockSize;
      if (fitSize < bestFitSize) {
        bestFitSize = fitSize;
        bestFitIndex = startIndex;
      }

      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
    }
  }

  if (bestFitIndex !== -1) {
    updateHoverState(bestFitIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

    allocateMemorySpace(bestFitIndex, processBlock);
    updateHoverState(bestFitIndex, processBlock.blockSize, false);
    renderMemorySections();
  } else {
    showMessage(
      `No available memory block found for ${processBlock.name}!`,
      "fail"
    );
    await sleep(500);
  }
};

const executeBestFit = async (isCancelled) => {
  await Display(isCancelled, "best_fit")
};

export { findBestFit, executeBestFit };
