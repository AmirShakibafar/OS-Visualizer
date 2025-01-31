const sanitizeInput = (input, maxLength) => {
  let value = input.value.replace(/\D/g, '');
  input.value = value.slice(0, maxLength);
};

const correctTwoDigitInputSize = (input) => {
  sanitizeInput(input, 2);
};

const correctOneDigitInputSize = (input) => {
  sanitizeInput(input, 1);
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

export { oneDigitNumberBox, twoDigitNumberBox };
