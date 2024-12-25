const correctInputSize = (input) => {
    if (input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }
};
  
const allowNumbersOnly = (inputElement) => {
    inputElement.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key === "Enter" || key === "Tab" || key === "Backspace") {
        return;
      }
      if (!/^[0-9]$/.test(key)) {
        e.preventDefault();
      }
    });
  };
  
export {allowNumbersOnly, correctInputSize};