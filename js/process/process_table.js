import {reOrderProcesses, getProcesses} from "./processes.js";


const render_processes = () => {
  processTable.innerHTML = "";
  if (getProcesses().length) {
    createDeleteRow();
  }
  reOrderProcesses();
  getProcesses().forEach((process) => {
    processTable.appendChild(createNewRow(process));
  });
};

export {render_processes};
