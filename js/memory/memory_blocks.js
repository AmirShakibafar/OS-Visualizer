import { showMessage } from "../helpers/message.js";
let memoryBlocks = [];

const getMemoryBlocks = () => {
  return memoryBlocks;
};

const addToMemoryBlocks = (memoryBlock) => {
  showMessage("process added successfully", "success");
  memoryBlocks.push(memoryBlock);
};

const clearMemoryBlocks = () => {
  if (!memoryBlocks.length) {
    showMessage("Table is already empty!", "fail");
    return;
  }
  showMessage("processes cleared successfully", "success");
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

const deleteMemoryBlock = (name, row) => {
  const memoryBlocks = getMemoryBlocks();
  const index = memoryBlocks.findIndex(proc => proc.name === name);
  if (index !== -1) {
    memoryBlocks.splice(index, 1);
    row.remove();
  }
};

export {
  clearMemoryBlocks,
  addToMemoryBlocks,
  reArrangeMemoryBlocks,
  getMemoryBlocks,
  deleteMemoryBlock
};
