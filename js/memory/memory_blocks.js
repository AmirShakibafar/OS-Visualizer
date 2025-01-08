let memoryBlocks = [];

const getMemoryBlocks = () => {
  return memoryBlocks;
};
const addToMemoryBlocks = (memoryBlock) => {
  memoryBlocks.push(memoryBlock);
};

const clearMemoryBlocks = () => {
  memoryBlocks = [];
};

const reArrangeMemoryBlocks = () => {
  if (!memoryBlocks.length) {
    return;
  }
  memoryBlocks.sort((a, b) => a.start - b.start);
  memoryBlocks.forEach((process, idx) => {
    process.name = `P${idx}`;
  });
};

export {
  clearMemoryBlocks,
  addToMemoryBlocks,
  reArrangeMemoryBlocks,
  getMemoryBlocks,
};
