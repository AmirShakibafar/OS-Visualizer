import { renderMemoryTable } from "./memory_process_table.js";
import { renderMobileTable } from "./mobile_process_table.js";

const renderAllTables = () => {
  renderMemoryTable();
  renderMobileTable();
};

export { renderAllTables };
