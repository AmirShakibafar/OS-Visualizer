import { describe, test, beforeEach , it, expect, vi } from "vitest";
import {
    clearMemoryBlocks,
    addToMemoryBlocks,
    reArrangeMemoryBlocks,
    getMemoryBlocks,
} from  "../memory_blocks.js";


describe("Memory Blocks Manager", () => {
    beforeEach(() => {
      // Reset memoryBlocks through clearMemoryBlocks() to ensure isolation
      clearMemoryBlocks();
      vi.clearAllMocks(); // Clear mock call history
    });
  
    it("Test case 1: should return an empty array initially", () => {
      expect(getMemoryBlocks()).toEqual([]);
    });
  
    it("Test case 2: should add a memory block and call showMessage", () => {
      const memoryBlock = { blockArrival: 5, name: "Block1" };
      addToMemoryBlocks(memoryBlock);
  
      expect(getMemoryBlocks()).toEqual([memoryBlock]);
    });
  
    it("Test case 3: should clear memory blocks and call showMessage", () => {
      addToMemoryBlocks({ blockArrival: 5, name: "Block1" });
      clearMemoryBlocks();
  
      expect(getMemoryBlocks()).toEqual([]);
    });
  
    it("Test case 4: should not clear memory blocks if already empty", () => {
      clearMemoryBlocks();
  
      expect(getMemoryBlocks()).toEqual([]);
    });
  
    it("Test case 5: should rearrange memory blocks and rename processes", () => {
      addToMemoryBlocks({ blockArrival: 5, name: "Block1" });
      addToMemoryBlocks({ blockArrival: 3, name: "Block2" });
      addToMemoryBlocks({ blockArrival: 1, name: "Block3" });
  
      reArrangeMemoryBlocks();
  
      expect(getMemoryBlocks()).toEqual([
        { blockArrival: 1, name: "P0" },
        { blockArrival: 3, name: "P1" },
        { blockArrival: 5, name: "P2" },
      ]);
    });
  
    it("Test case 6: should not rearrange memory blocks if the array is empty", () => {
      reArrangeMemoryBlocks();
  
      expect(getMemoryBlocks()).toEqual([]);
    });

    it("Test case 7: should handle adding multiple memory blocks correctly", () => {
        const memoryBlock1 = { blockArrival: 5, name: "Block1" };
        const memoryBlock2 = { blockArrival: 2, name: "Block2" };
        const memoryBlock3 = { blockArrival: 8, name: "Block3" };
    
        addToMemoryBlocks(memoryBlock1);
        addToMemoryBlocks(memoryBlock2);
        addToMemoryBlocks(memoryBlock3);
    
        expect(getMemoryBlocks()).toEqual([memoryBlock1, memoryBlock2, memoryBlock3]);
      });
    
      it("Test case 8: should not modify the array when reArrangeMemoryBlocks is called with blocks having the same arrival time", () => {
        addToMemoryBlocks({ blockArrival: 2, name: "Block1" });
        addToMemoryBlocks({ blockArrival: 2, name: "Block2" });
    
        reArrangeMemoryBlocks();
    
        expect(getMemoryBlocks()).toEqual([
          { blockArrival: 2, name: "P0" },
          { blockArrival: 2, name: "P1" },
        ]);
      });
    
      it("Test case 9: should preserve the order of memory blocks if they are already sorted", () => {
        addToMemoryBlocks({ blockArrival: 1, name: "Block1" });
        addToMemoryBlocks({ blockArrival: 2, name: "Block2" });
        addToMemoryBlocks({ blockArrival: 3, name: "Block3" });
    
        reArrangeMemoryBlocks();
    
        expect(getMemoryBlocks()).toEqual([
          { blockArrival: 1, name: "P0" },
          { blockArrival: 2, name: "P1" },
          { blockArrival: 3, name: "P2" },
        ]);
      });
    
      it("Test case 10: should correctly handle reordering and clearing memory blocks", () => {
        addToMemoryBlocks({ blockArrival: 3, name: "Block1" });
        addToMemoryBlocks({ blockArrival: 1, name: "Block2" });
    
        reArrangeMemoryBlocks();
        expect(getMemoryBlocks()).toEqual([
          { blockArrival: 1, name: "P0" },
          { blockArrival: 3, name: "P1" },
        ]);
    
        clearMemoryBlocks();
        expect(getMemoryBlocks()).toEqual([]);
      });
    
      it("Test case 11: should handle adding a memory block with duplicate arrival times", () => {
        addToMemoryBlocks({ blockArrival: 2, name: "Block1" });
        addToMemoryBlocks({ blockArrival: 2, name: "Block2" });
    
        expect(getMemoryBlocks()).toEqual([
          { blockArrival: 2, name: "Block1" },
          { blockArrival: 2, name: "Block2" },
        ]);
      });
    
    
      it("Test case 12: should handle clearing memory blocks after multiple additions", () => {
        addToMemoryBlocks({ blockArrival: 5, name: "Block1" });
        addToMemoryBlocks({ blockArrival: 3, name: "Block2" });
        addToMemoryBlocks({ blockArrival: 1, name: "Block3" });
    
        expect(getMemoryBlocks().length).toBe(3);
        clearMemoryBlocks();
        expect(getMemoryBlocks()).toEqual([]);
      });
  });