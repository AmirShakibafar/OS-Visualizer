
import {getProcesses, reOrderProcesses} from "./processes.js";

import {mobileControls, cardsContainer, createNewCard, mobileSection} from "./process_table_elements.js";


const checkToShowDeleteButton = () => {
  if (getProcesses().length) {
    mobileControls.style.display = "block";
    mobileSection.style.border = "1px solid var(--primary-color)"; 
  } else {
    mobileControls.style.display = "none";
    mobileSection.style.border = "none"; 
  }
}

const renderMobileProcesses = () => {
  cardsContainer.innerHTML = "";
  checkToShowDeleteButton();
  reOrderProcesses();
  getProcesses().forEach((process) => {
    cardsContainer.appendChild(createNewCard(process));
  });
};

export {renderMobileProcesses};
