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

const findFirstFit = async (processBlock) => {
  let startIndex = 0;
  const memorySpaces = getMemorySpaces();
  if (readIsCancelled()) return;
  while (startIndex + processBlock.blockSize <= memorySpaces.length) {
    if (readIsCancelled()) return;
    updateHoverState(startIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(SPEED);
    

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

const executeFirstFit = async () => {
  await Display("first_fit");
};

export { executeFirstFit, findFirstFit };
