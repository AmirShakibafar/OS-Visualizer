import { createMemoryBlock } from "./memory_block.js";
import { getMemoryBlocks } from "./memory_blocks.js";
import { renderMemoryTable } from "./memory_process_table.js";
const createProcesses = (processInformations) => {
    processInformations.forEach(process => {
        let info = process.split("#");
        getMemoryBlocks().push(createMemoryBlock(info[1], info[2], info[3]));
    });

}
const uploadBox = document.getElementById('memory-upload-box')
uploadBox.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;
        const splittedProcesses = content.split('\n');
        
        createProcesses(splittedProcesses);
        renderMemoryTable();
      };
      reader.readAsText(file);
    }
  });
