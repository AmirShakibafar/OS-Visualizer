import { showMessage } from "../helpers/message.js";

const memorySpaces = Array.from({ length: 64 }, (_, i) => ({
  processName: "empty",
  blockExitTime: null,
  bgColor: null,
  isActive: false,
  isHovered: false,
  blockIndex: i,
}));

const getMemorySpaces = () => {
  return memorySpaces;
};

const clearMemorySpaces = () => {
  for (let i = 0; i < memorySpaces.length; i++) {
    memorySpaces[i] = {
      ...memorySpaces[i],
      processName: "empty",
      bgColor: null,
      isActive: false,
    };
  }
};

const updateHoverState = (start, size, isHovered) => {
  for (let i = start; i < start + size; i++) {
    memorySpaces[i].isHovered = isHovered;
  }
};

const allocateMemorySpace = (start, processBlock) => {
  for (let i = start; i < start + processBlock.blockSize; i++) {
    memorySpaces[i] = {
      ...memorySpaces[i],
      processName: processBlock.name,
      blockExitTime: processBlock.blockExitTime,
      bgColor: processBlock.bgColor,
      isActive: true,
    };
  }
};

const deAllocateMemorySpace = (currTick) => {
  for (let i = 0; i < 64; i++) {
    if (
      memorySpaces[i].blockExitTime &&
      memorySpaces[i].blockExitTime <= currTick
    ) {
      memorySpaces[i] = {
        processName: "empty",
        bgColor: null,
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        blockIndex: i,
      };
      return true;
    }
  }
  return false;
};

const checkIfRangeEmpty = (start, size) => {
  for (let i = start; i < start + size; i++) {
    if (memorySpaces[i].isActive) {
      return false;
    }
  }
  return true;
};

// const checkFirstEmptySpace = (processBlock) => {
//   let startIndex = 0;

//   while (startIndex + processBlock.blockSize <= memorySpaces.length) {
//     updateHoverState(startIndex, processBlock.blockSize, true);

//     if (checkIfRangeEmpty(startIndex, processBlock.blockSize)) {
//       showMessage(`Found space starting at block: ${startIndex}!`, "success");
//       allocateMemorySpace(startIndex, processBlock);
//       renderMemorySections();
//       updateHoverState(startIndex, processBlock.blockSize, false);
//       return;
//     }

//     updateHoverState(startIndex, processBlock.blockSize, false);
//     startIndex++;
//   }

//   showMessage("No available memory block found!", "fail");
// };

export {
  getMemorySpaces,
  clearMemorySpaces,
  allocateMemorySpace,
  deAllocateMemorySpace,
  updateHoverState,
  checkIfRangeEmpty,
};
