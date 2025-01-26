import {getProcesses, reOrderProcesses} from "./processes.js";
import {mobileControls, cardsContainer, createNewCard} from "./process_table_elements.js";

const checkToShowDeleteButton = () => {
  if (getProcesses().length) {
    mobileControls.style.display = "block";
  } else {
    mobileControls.style.display = "none";
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
