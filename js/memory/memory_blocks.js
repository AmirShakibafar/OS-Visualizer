import { showMessage } from "./message.js";
let memoryBlocks = [];

const getMemoryBlocks = () => {
  return memoryBlocks;
};

const addToMemoryBlocks = (memoryBlock) => {
  showMessage("process added successfully!", "success");
  memoryBlocks.push(memoryBlock);
};

const clearMemoryBlocks = () => {
  memoryBlocks = [];
};

const reArrangeMemoryBlocks = () => {
  if (!memoryBlocks.length) {
    return;
  }
  memoryBlocks.sort((a, b) => a.blockArrival - b.blockArrival);
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
