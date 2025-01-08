let memoryBlocks = [];

const addToMemoryBlocks = (memoryBlock) => {
    memoryBlocks.push(memoryBlock);
}

const clearMemoryBlock = () => {
    memoryBlocks = [];
}

export {clearMemoryBlock, addToMemoryBlocks};