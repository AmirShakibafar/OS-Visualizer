import { getMemoryBlocks } from "./memory_blocks.js";
import { generate_random_color, generateAccentColor } from "../helpers/helpers.js";

const createMemoryBlock = (arrival, size, duration) => {
  const backgroundColor = generate_random_color();
  return {
    name: `P${getMemoryBlocks().length}`,
    blockSize: size,
    blockArrival: arrival,
    blockExitTime: arrival + duration,
    color: generateAccentColor(backgroundColor),
    bgColor: backgroundColor,
  };
};

export {createMemoryBlock}