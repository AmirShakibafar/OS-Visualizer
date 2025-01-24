import {
    getMemorySpaces,
    clearMemorySpaces,
    deAllocateMemorySpace,
  } from "./memory_space.js";
import { getMemoryBlocks } from "./memory_blocks.js";
import { sleep } from "../helpers/helpers.js";
import { updateTime, resetTime } from "./timer.js";
import { currentSpeed } from "./speed.js";
import { renderMemorySections } from "./memory_table.js";
import { findBestFit } from "./best_fit.js";
import { findFirstFit } from "./first_fit.js";
import { findWorstFit } from "./worst_fit.js";
import { findNextFit } from "./next_fit.js";

const Display = async (isCancelled, type_of_memory) =>  {
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
    switch (type_of_memory){
        case "first_fit":
            await findFirstFit(process, isCancelled)
            break
        case "worst_fit":
            await findWorstFit(process, isCancelled)
            break
        case "next_fit":
            await findNextFit(process, isCancelled)
            break
        case "best_fit":
            await findBestFit(process, isCancelled)
            break
        
    }
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
}

export {Display}