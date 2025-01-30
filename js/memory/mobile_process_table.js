import { getMemoryBlocks, reArrangeMemoryBlocks } from "./memory_blocks.js";
import {
  cardsContainer,
  showOrHideButton,
  createNewCard,
} from "./process_table_elements.js";
const renderMobileTable = () => {
  cardsContainer.innerHTML = "";
  showOrHideButton();
  reArrangeMemoryBlocks();
  getMemoryBlocks().forEach((process) => {
    cardsContainer.appendChild(createNewCard(process));
  });
};
export { renderMobileTable };
