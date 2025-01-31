import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getMemorySpaces,
  clearMemorySpaces,
  allocateMemorySpace,
  deAllocateMemorySpace,
  updateHoverState,
  checkIfRangeEmpty,
  findRangeOfEmpty
} from "../memory_space"; 


describe("getMemorySpaces", () => {
  beforeEach(() => {
    clearMemorySpaces();
  });

  it("Test case 1: should return all memory spaces with default values", () => {
    const memorySpaces = getMemorySpaces();
    expect(memorySpaces).toHaveLength(64);
    memorySpaces.forEach((space, index) => {
      expect(space).toEqual({
        processName: "empty",
        blockExitTime: null,
        bgColor: null,
        color: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: index,
      });
    });
  });
});

describe("clearMemorySpaces", () => {
  it("Test case 1: should reset all memory spaces to default values", () => {
    allocateMemorySpace(0, {
      name: "test",
      blockSize: 5,
      blockExitTime: 10,
      bgColor: "red",
      color: "white",
    });

    clearMemorySpaces();

    const memorySpaces = getMemorySpaces();
    expect(memorySpaces).toHaveLength(64);
    memorySpaces.forEach((space, index) => {
      expect(space).toEqual({
        processName: "empty",
        blockExitTime: null,
        bgColor: null,
        color: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: index,
      });
    });
  });
});

describe("allocateMemorySpace", () => {
  beforeEach(() => {
    clearMemorySpaces();
  });

  it("Test case 1: should allocate memory to the specified range", () => {
    allocateMemorySpace(10, {
      name: "processA",
      blockSize: 5,
      blockExitTime: 20,
      bgColor: "blue",
      color: "white",
    });

    const memorySpaces = getMemorySpaces();
    for (let i = 10; i < 15; i++) {
      expect(memorySpaces[i]).toEqual({
        processName: "processA",
        blockExitTime: 20,
        bgColor: "blue",
        color: "white",
        isActive: true,
        isHovered: false,
        wasRecentlyAdded: true,
        blockIndex: i,
      });
    }
  });

  it("Test case 2: should handle overlapping memory allocations", () => {
    allocateMemorySpace(10, {
      name: "processA",
      blockSize: 5,
      blockExitTime: 20,
      bgColor: "blue",
      color: "white",
    });

    allocateMemorySpace(12, {
      name: "processB",
      blockSize: 5,
      blockExitTime: 30,
      bgColor: "green",
      color: "black",
    });

    const memorySpaces = getMemorySpaces();
    for (let i = 10; i < 12; i++) {
      expect(memorySpaces[i]).toEqual({
        processName: "processA",
        blockExitTime: 20,
        bgColor: "blue",
        color: "white",
        isActive: true,
        isHovered: false,
        wasRecentlyAdded: true,
        blockIndex: i,
      });
    }

    for (let i = 12; i < 17; i++) {
      expect(memorySpaces[i]).toEqual({
        processName: "processB",
        blockExitTime: 30,
        bgColor: "green",
        color: "black",
        isActive: true,
        isHovered: false,
        wasRecentlyAdded: true,
        blockIndex: i,
      });
    }
  });

  it("Test case 3: should handle cyclic allocation", () => {
    allocateMemorySpace(62, {
      name: "processC",
      blockSize: 5,
      blockExitTime: 15,
      bgColor: "yellow",
      color: "purple",
    });

    const memorySpaces = getMemorySpaces();
    expect(memorySpaces[62]).toMatchObject({ processName: "processC" });
    expect(memorySpaces[63]).toMatchObject({ processName: "processC" });
    expect(memorySpaces[0]).toMatchObject({ processName: "processC" });
    expect(memorySpaces[1]).toMatchObject({ processName: "processC" });
    expect(memorySpaces[2]).toMatchObject({ processName: "processC" });
  });
});

describe("deAllocateMemorySpace", () => {
  beforeEach(() => {
    clearMemorySpaces();
  });

  it("Test case 1: should deallocate expired memory spaces", () => {
    allocateMemorySpace(0, {
      name: "processB",
      blockSize: 5,
      blockExitTime: 5,
      bgColor: "green",
      color: "black",
    });

    const result = deAllocateMemorySpace(5);
    const memorySpaces = getMemorySpaces();

    expect(result).toBe(true);
    expect(memorySpaces[0]).toEqual({
        processName: "empty",
        blockExitTime: null,
        bgColor: null,
        color: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 0,
    })

    for (let i = 1; i < 5; i++) {
      expect(memorySpaces[i]).toEqual({
        processName: "processB",
        blockExitTime: 5,
        bgColor: "green",
        color: "black",
        isActive: true,
        isHovered: false,
        wasRecentlyAdded: true,
        blockIndex: i,
      });
    }
  });

  it("Test case 2: should return false if no spaces to deallocate", () => {
    const result = deAllocateMemorySpace(10);
    expect(result).toBe(false);
  });
});

describe("updateHoverState", () => {
  beforeEach(() => {
    clearMemorySpaces();
  });

  it("Test case 1: should update hover state for a specific range", () => {
    updateHoverState(10, 5, true);

    const memorySpaces = getMemorySpaces();
    for (let i = 10; i < 15; i++) {
      expect(memorySpaces[i]).toMatchObject({
        isHovered: true,
      });
    }
  });

  it("Test case 2: should handle cyclic hover state update", () => {
    updateHoverState(62, 5, true);

    const memorySpaces = getMemorySpaces();
    expect(memorySpaces[62].isHovered).toBe(true);
    expect(memorySpaces[63].isHovered).toBe(true);
    expect(memorySpaces[0].isHovered).toBe(true);
    expect(memorySpaces[1].isHovered).toBe(true);
    expect(memorySpaces[2].isHovered).toBe(true);
  });
});

describe("checkIfRangeEmpty", () => {
  beforeEach(() => {
    clearMemorySpaces();
  });

  it("Test case 1: should return true if range is empty", () => {
    expect(checkIfRangeEmpty(0, 5)).toBe(true);
  });

  it("Test case 2: should return false if range is not empty", () => {
    allocateMemorySpace(0, {
      name: "processC",
      blockSize: 3,
      blockExitTime: 15,
      bgColor: "yellow",
      color: "black",
    });

    expect(checkIfRangeEmpty(0, 5)).toBe(false);
  });

  it("Test case 3: should handle cyclic range check", () => {
    allocateMemorySpace(62, {
      name: "processD",
      blockSize: 5,
      blockExitTime: 10,
      bgColor: "orange",
      color: "white",
    });

    expect(checkIfRangeEmpty(60, 4)).toBe(false);
    expect(checkIfRangeEmpty(3, 4)).toBe(true);
  });
});


describe("findRangeOfEmpty", () => {
  beforeEach(() => {
    clearMemorySpaces();
  });

  it("Test case 1: should return range of empty", () => {
    expect(findRangeOfEmpty(0)).toBe(64);
  });

});

