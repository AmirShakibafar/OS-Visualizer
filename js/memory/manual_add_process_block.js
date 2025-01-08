import {
    correctInputSize,
    allowNumbersOnly,
} from "../helpers/inputValidation.js";
import { createMemoryBlock } from "./memory_block.js";
import { getMemoryBlocks, addToMemoryBlocks } from "./memory_blocks.js";

const blockSize = document.getElementById("block-size");
const blockArrive = document.getElementById("block-arrival");
const blockDuration = document.getElementById("block-duration");
const submitNewProcess = document.getElementById("process-block-adder");

blockSize.addEventListener("input", () => correctInputSize(blockSize));
allowNumbersOnly(blockSize);
blockArrive.addEventListener("input", () => correctInputSize(blockArrive));
allowNumbersOnly(blockArrive);
blockDuration.addEventListener("input", () => correctInputSize(blockDuration));
allowNumbersOnly(blockDuration);
const submitHandler = () => {
    if (!blockSize.value || !blockArrive.value || !blockDuration.value) {
        return 
    }
}
submitNewProcess.addEventListener("click", submitHandler);
