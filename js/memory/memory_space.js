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
  memorySpaces.length = 0;
  for (let i = 0; i < 64; i++) {
    memorySpaces[i] = {
      processName: "empty",
      bgColor: null,
      color: null,
      blockExitTime: null,
      isActive: false,
      isHovered: false,
      wasRecentlyAdded: false,
      blockIndex: i,
    };
  }
};

const updateHoverState = (start, size, isHovered) => {
  for (let i = start; i < start + size; i++) {
    memorySpaces[i % 64].isHovered = isHovered;
  }
};

const allocateMemorySpace = (start, processBlock) => {
  for (let i = start; i < start + processBlock.blockSize; i++) {
    memorySpaces[i % 64] = {
      ...memorySpaces[i % 64],
      processName: processBlock.name,
      blockExitTime: processBlock.blockExitTime,
      bgColor: processBlock.bgColor,
      color: processBlock.color,
      wasRecentlyAdded: true,
      isActive: true,
    };
  }
};

const deAllocateMemorySpace = (currTick) => {
  for (let i = 0; i < 64; i++) {
    if (
      memorySpaces[i % 64].blockExitTime &&
      memorySpaces[i % 64].blockExitTime <= currTick
    ) {
      memorySpaces[i % 64] = {
        processName: "empty",
        bgColor: null,
        color: null,
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: i,
      };
      return true;
    }
  }
  return false;
};

const checkIfRangeEmpty = (startIndex, blockSize) => {
  const memorySpaces = getMemorySpaces();
  
  for (let i = startIndex; i < startIndex + blockSize; i++) {
    if (memorySpaces[i % 64].processName !== "empty") {
      return false;
    }
  }
  return true;
};

const findRangeOfEmpty = (startIndex) => {
  let counter = 0;
  for(let i = startIndex; i < 64; i++){
    if(memorySpaces[i].processName ==  "empty"){
      counter++
    }else{
      break
    }
  }
  return counter
}

export {
  getMemorySpaces,
  clearMemorySpaces,
  allocateMemorySpace,
  deAllocateMemorySpace,
  updateHoverState,
  checkIfRangeEmpty,
  findRangeOfEmpty,
};
