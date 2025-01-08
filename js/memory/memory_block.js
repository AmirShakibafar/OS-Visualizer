import {
  correctInputSize,
  allowNumbersOnly,
} from "../helpers/inputValidation.js";
import { getMemoryBlocks } from "./memory_blocks.js";
import { generate_random_color, generateAccentColor } from "../helpers/helpers";
const blockSize = document.getElementById("block-size");
const blockArrive = document.getElementById("block-arrival");


const createMemoryBlock = (size, arrival) => {
  const backgroundColor = generate_random_color();
  return {
    name: `P${getMemoryBlocks().length}`,
    blockSize: size,
    blockArrival: arrival,
    color: generateAccentColor(backgroundColor),
    bgColor: backgroundColor,
  };
};

export {createMemoryBlock}