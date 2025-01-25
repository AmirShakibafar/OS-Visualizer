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

const findWorstFit = async (processBlock, isCancelled) => {
  const memorySpaces = getMemorySpaces();
  let worstFitIndex = -1;
  let worstFitSize = -1;

  for (let startIndex = 0; startIndex < memorySpaces.length; startIndex++) {
    if (isCancelled()) return;

    if (
      startIndex + processBlock.blockSize <= memorySpaces.length &&
      checkIfRangeEmpty(startIndex, processBlock.blockSize)
    ) {
      updateHoverState(startIndex, processBlock.blockSize, true);
      renderMemorySections();
      await sleep(currentSpeed);

      const fitSize = memorySpaces.length - startIndex;
      if (fitSize > worstFitSize) {
        worstFitSize = fitSize;
        worstFitIndex = startIndex;
      }

      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
    }
  }

  if (worstFitIndex !== -1) {
    updateHoverState(worstFitIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

    allocateMemorySpace(worstFitIndex, processBlock);
    updateHoverState(worstFitIndex, processBlock.blockSize, false);
    renderMemorySections();
  } else {
    showMessage(
      `No available memory block found for ${processBlock.name}!`,
      "fail"
    );
    await sleep(500);
  }
};

const executeWorstFit = async (isCancelled) => {
  await Display(isCancelled, "worst_fit")
  };

export {executeWorstFit, findWorstFit};