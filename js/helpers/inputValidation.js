const correctTwoDigitInputSize = (input) => {
  if (input.value.length > 2) {
    input.value = input.value.slice(0, 2);
  }
};

const correctOneDigitInputSize = (input) => {
  if (input.value.length > 1) {
    input.value = input.value.slice(0, 1);
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

const oneDigitNumberBox = (inputElement) => {
  allowNumbersOnly(inputElement);
  inputElement.addEventListener("input", (e) => correctOneDigitInputSize(e.target));
};

const twoDigitNumberBox = (inputElement) => {
  allowNumbersOnly(inputElement);
  inputElement.addEventListener("input", (e) => correctTwoDigitInputSize(e.target));
};



export { oneDigitNumberBox, twoDigitNumberBox};
