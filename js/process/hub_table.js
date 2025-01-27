import { renderMobileProcesses} from "./mobile_table.js";
import { renderDesktopProcesses} from "./desktop_table.js";

const renderOnTables = () => {
  renderDesktopProcesses();
  renderMobileProcesses();
};

export {renderOnTables};
