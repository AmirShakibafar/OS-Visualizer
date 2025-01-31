import {
  getMemorySpaces,
  clearMemorySpaces,
  deAllocateMemorySpace,
} from "./memory_space.js";
import { getMemoryBlocks } from "./memory_blocks.js";
import { sleep } from "../helpers/helpers.js";
import { updateTime, resetTime } from "./timer.js";
import { SPEED } from "../helpers/speed.js";
import { renderMemorySections } from "./memory_table.js";
import { findBestFit } from "./best_fit.js";
import { findFirstFit } from "./first_fit.js";
import { findWorstFit } from "./worst_fit.js";
import { findNextFit } from "./next_fit.js";
import { readIsCancelled } from "../helpers/cancelFlag.js";

const getMemoryAlgorithm = (typeOfMemory) => {
  switch (typeOfMemory) {
    case "first_fit":
      return findFirstFit;
    case "worst_fit":
      return findWorstFit;
    case "next_fit":
      return findNextFit;
    case "best_fit":
      return findBestFit;
    default:
      return undefined;
  }
};

const Display = async (typeOfMemory) => {
  const processBlocks = getMemoryBlocks();
  clearMemorySpaces();
  resetTime();
  let currTick = 0;

  for (const process of processBlocks) {
    while (currTick < process.blockArrival) {
      if (readIsCancelled()) return;
      let mustGetDeAllocated = deAllocateMemorySpace(currTick);
      while (mustGetDeAllocated) {
        if (readIsCancelled()) return;
        await sleep(SPEED);
        mustGetDeAllocated = deAllocateMemorySpace(currTick);
        renderMemorySections();
      }

      currTick++;
      updateTime(currTick);
      await sleep(SPEED);
    }
    if (readIsCancelled()) return;
    await getMemoryAlgorithm(typeOfMemory)(process);
    updateTime(currTick);
    await sleep(SPEED);
  }

  while (true) {
    if (readIsCancelled()) return;
    let mustGetDeAllocated = deAllocateMemorySpace(currTick);
    const activeProcesses = getMemorySpaces().some((space) => space.isActive);
    if (!activeProcesses) {
      break;
    }

    while (mustGetDeAllocated) {
      if (readIsCancelled()) return;
      await sleep(SPEED);
      mustGetDeAllocated = deAllocateMemorySpace(currTick);
      renderMemorySections();
    }

    currTick++;
    updateTime(currTick);
    await sleep(SPEED);
  }
};

export { Display };
export { getMemoryAlgorithm }; // needed for testing
