import { getMemoryBlocks, reArrangeMemoryBlocks } from "./memory_blocks.js";
import {
  memoryTable,
  deleteAllRowButton,
  createNewRow,
} from "./process_table_elements.js";

const renderMemoryTable = () => {
  memoryTable.innerHTML = "";
  if (getMemoryBlocks().length) {
    deleteAllRowButton();
  }
  reArrangeMemoryBlocks();
  getMemoryBlocks().forEach((process) => {
    memoryTable.appendChild(createNewRow(process));
  });
};

export { renderMemoryTable };
