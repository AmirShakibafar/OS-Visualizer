import {getProcesses, reOrderProcesses} from "./processes.js";
import {mobileControls, cardsContainer, createNewCard} from "./process_table_elements.js";

const checkToShowDeleteButton = () => {
  if (getProcesses().length) {
    mobileControls.style.display = "block";
  } else {
    mobileControls.style.display = "none";
  }
}

const render_mobile_processes = () => {
  cardsContainer.innerHTML = "";
  checkToShowDeleteButton();
  reOrderProcesses();
  getProcesses().forEach((process) => {
    cardsContainer.appendChild(createNewCard(process));
  });
};

export {render_mobile_processes};
