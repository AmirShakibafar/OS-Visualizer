import {reOrderProcesses, getProcesses} from "./processes.js";
import { processTable, createDeleteRow, createNewRow } from "./process_table_elements.js";

const renderDesktopProcesses = () => {
  processTable.innerHTML = "";
  if (getProcesses().length) {
    createDeleteRow();
  }
  reOrderProcesses();
  getProcesses().forEach((process) => {
    processTable.appendChild(createNewRow(process));
  });
};

export {renderDesktopProcesses};
