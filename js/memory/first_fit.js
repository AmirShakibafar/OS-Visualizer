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
        showMessage(
            `found empty block for ${processBlock.name} at index: ${startIndex}`,
            "success"
          );
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
  Display(isCancelled, "first_fit")
};

export {executeFirstFit, findFirstFit};
