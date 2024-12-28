import { processes, generateProcess } from "./processes.js";
import { render_processes } from "./process_table.js";

const createProcesses = (processInformations) => {
    processInformations.forEach(process => {
        let info = process.split("#");
        processes.push(generateProcess(info[1], info[2]));
    });

}
const uploadBox = document.getElementById('upload-box')
uploadBox.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;
        const splittedProcesses = content.split('\n');
        createProcesses(splittedProcesses);
        render_processes(processes);
      };
      reader.readAsText(file);
    }
  });

