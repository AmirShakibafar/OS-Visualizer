import { renderMemorySections } from "./memory_table.js";
import {
  getMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
  findRangeOfEmpty
} from "./memory_space.js";
import { sleep } from "../helpers/helpers.js";
import { SPEED } from "../helpers/speed.js";
import { Display } from "./display.js";
import { readIsCancelled } from "../helpers/cancelFlag.js";

const findWorstFit = async (processBlock) => {
  const memorySpaces = getMemorySpaces();
  let worstFitIndex = -1;
  let worstFitSize = -1;
  let startIndex = 0;
  let emptyRangeSize;

  while (startIndex < memorySpaces.length) {
    if (readIsCancelled()) return;

    if (
      startIndex + processBlock.blockSize <= memorySpaces.length &&
      checkIfRangeEmpty(startIndex, processBlock.blockSize)
    ) {
      updateHoverState(startIndex, processBlock.blockSize, true);
      renderMemorySections();
      await sleep(SPEED);

      emptyRangeSize = findRangeOfEmpty(startIndex)
      if (emptyRangeSize > worstFitSize){
        worstFitSize = emptyRangeSize;
        worstFitIndex = startIndex
      }

      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
      startIndex += emptyRangeSize;
    }else{
      startIndex++
    }
  }

  if (worstFitIndex !== -1) {
    updateHoverState(worstFitIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(SPEED);

    allocateMemorySpace(worstFitIndex, processBlock);
    updateHoverState(worstFitIndex, processBlock.blockSize, false);
    renderMemorySections();
  }
};

const executeWorstFit = async () => {
  await Display("worst_fit")
  };

export {executeWorstFit, findWorstFit};