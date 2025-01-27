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


const findWorstFit = async (processBlock) => {
  const memorySpaces = getMemorySpaces();
  let worstFitIndex = -1;
  let worstFitSize = -1;

  for (let startIndex = 0; startIndex < memorySpaces.length; startIndex++) {
    if (readIsCancelled()) return;

    if (
      startIndex + processBlock.blockSize <= memorySpaces.length &&
      checkIfRangeEmpty(startIndex, processBlock.blockSize)
    ) {
      updateHoverState(startIndex, processBlock.blockSize, true);
      renderMemorySections();
      await sleep(SPEED);

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
    await sleep(SPEED);
    

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

const executeWorstFit = async () => {
  await Display("worst_fit")
  };

export {executeWorstFit, findWorstFit};