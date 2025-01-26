import { renderMobileProcesses} from "./mobile_table.js";
import { renderDesktopProcesses} from "./desktop_table.js";
import { cardsContainer, processTable } from "./process_table_elements.js";

const renderOnTables = () => {
  renderDesktopProcesses();
  renderMobileProcesses();
};

export {renderOnTables};
