import { getMemoryBlocks } from "./memory_blocks.js";
import {
  generate_random_color,
  generateAccentColor,
} from "../helpers/helpers.js";

const createMemoryBlock = (arrival, size, duration) => {
  const backgroundColor = generate_random_color();
  return {
    name: `P${getMemoryBlocks().length}`,
    blockSize: Number(size),
    blockArrival: Number(arrival),
    blockExitTime: Number(arrival) + Number(duration),
    blockStartIndex: null,
    color: generateAccentColor(backgroundColor),
    bgColor: backgroundColor,
    isActive: false,
  };
};

export { createMemoryBlock };
