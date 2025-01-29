import { describe, beforeEach , it, expect, vi } from "vitest";
import { createMemoryBlock } from  "../memory_block.js";
import { generate_random_color, generateAccentColor } from "../../helpers/helpers.js";
import { getMemoryBlocks } from "../memory_blocks.js";




// Disable DOM

vi.mock('../../helpers/helpers.js', () => ({
    generate_random_color: vi.fn(),
    generateAccentColor: vi.fn()
}));
vi.mock('../memory_blocks', () => ({
    getMemoryBlocks: vi.fn(),
}));



/////////////////////////////     Tests    ////////////////////////////

describe("Memory Blocks Manager", () => {
    beforeEach(() => {
      vi.clearAllMocks(); // Clear mock call history
      generateAccentColor.mockReturnValue("rgba(255,255,255,)");
      generate_random_color.mockReturnValue("rgba(255,255,255,)");
      getMemoryBlocks.mockReturnValue([0,0,0,0]);

    });
  
    it("Test case 1: should create block with random color and return it", () => {
        const arrival = 5;
        const size = 10;
        const duration = 10;
        const block = createMemoryBlock(arrival, size, duration);

        expect(generateAccentColor).toBeCalledTimes(1); // for background
        expect(generate_random_color).toBeCalledTimes(1); // for color
        expect(block.name).toBe("P4");
        expect(block.blockSize).toBe(size);
        expect(block.blockArrival).toBe(arrival);
        expect(block.blockExitTime).toBe(arrival + duration);
        expect(block.blockStartIndex).toBe(null);
        expect(block.isActive).toBe(false);
        expect(block.color).toBe("rgba(255,255,255,)");
        expect(block.bgColor).toBe("rgba(255,255,255,)");
    });
});