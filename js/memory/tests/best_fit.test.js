import { describe, it, expect, vi, beforeEach } from "vitest";
import { findBestFit, executeBestFit } from "../best_fit"; // Assuming the file name
import {
  getMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
  findRangeOfEmpty,
} from "../memory_space.js";
import { renderMemorySections } from "../memory_table";
import { Display } from "../display.js";
import { readIsCancelled } from "../../helpers/cancelFlag";

// Mock dependencies
vi.mock("../memory_space", () => ({
  getMemorySpaces: vi.fn(),
  allocateMemorySpace: vi.fn(),
  checkIfRangeEmpty: vi.fn(),
  updateHoverState: vi.fn(),
  clearMemorySpaces: vi.fn(),
  deAllocateMemorySpace: vi.fn(),
  findRangeOfEmpty: vi.fn()
}));

vi.mock("../display", () => ({
  Display: vi.fn(),
}))

vi.mock("../../helpers/helpers", () => ({
  sleep: vi.fn(() => Promise.resolve()),
}));

vi.mock("../memory_table", () => ({
  renderMemorySections: vi.fn(),
}));

vi.mock("../helpers/message", () => ({
  showMessage: vi.fn(),
}));

vi.mock("../../speed", () => ({
  SPEED: 1,
}));

vi.mock("../timer", () => ({
  updateTime: vi.fn(),
  resetTime: vi.fn(),
}));

vi.mock("../memory_blocks", () => ({
  getMemoryBlocks: vi.fn(),
}));

vi.mock('../../helpers/cancelFlag.js', () => ({
  readIsCancelled: vi.fn(),
}));


  
  
describe("findBestFit", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    getMemorySpaces.mockReturnValue(
      Array.from({ length: 64 }, (_, i) => ({
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        blockIndex: i,
      }))
    );
    readIsCancelled.mockReturnValue(false);
  });

  it("Test case 1: should find and allocate the best fit block", async () => {
    const processBlock = { name: "ProcessA", blockSize: 2, blockExitTime: 10, bgColor: "blue", color: "white" };
    checkIfRangeEmpty.mockImplementation((start, size) => start >= 2 || (start > 4 && start + size <= 64));
    getMemorySpaces.mockReturnValue([
        {
            processName: "any",
            bgColor: "any",
            color: "any",
            blockExitTime: 100,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 0,
        },
        {
            processName: "any",
            bgColor: "any",
            color: "any",
            blockExitTime: 100,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 1,
        },
        {
            processName: "empty",
            bgColor: null,
            color: null,
            blockExitTime: null,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 2,
        },
        {
            processName: "empty",
            bgColor: null,
            color: null,
            blockExitTime: null,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 3,
        },
        {
            processName: "any2",
            bgColor: "any2",
            color: "any2",
            blockExitTime: 100,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 4,
        }
    ])

    findRangeOfEmpty.mockImplementation((startIndex) => {
      if (startIndex == 2){
          return 2
        }
      })

    await findBestFit(processBlock);

    expect(updateHoverState).toHaveBeenCalledWith(expect.any(Number), 2, true);
    expect(updateHoverState).toHaveBeenCalledWith(expect.any(Number), 2, false);
    expect(renderMemorySections).toHaveBeenCalled();
    expect(allocateMemorySpace).toHaveBeenCalledWith(2, processBlock); // find best fit in index 2 and allocate
  });

  it("Test case 2: should fail to find a block if no suitable space is available", async () => {
    const processBlock = { name: "ProcessB", blockSize: 10, blockExitTime: 15 };
    checkIfRangeEmpty.mockReturnValue(false);

    await findBestFit(processBlock);

    expect(updateHoverState).not.toHaveBeenCalled();
    expect(renderMemorySections).not.toHaveBeenCalled();
    expect(checkIfRangeEmpty).toHaveBeenCalled();
    expect(allocateMemorySpace).not.toHaveBeenCalled();
  });

  it("Test case 3: should stop execution if cancelled", async () => {
    const processBlock = { name: "ProcessC", blockSize: 5, blockExitTime: 20 };
    readIsCancelled.mockReturnValue(true);

    await findBestFit(processBlock);

    expect(updateHoverState).toHaveBeenCalledTimes(0); // Stops after cancellation
    expect(renderMemorySections).toHaveBeenCalledTimes(0);
    expect(allocateMemorySpace).not.toHaveBeenCalled();
  });


  it("Test case 4: should find and allocate the best fit block among varying sizes", async () => {
    const processBlock = { name: "ProcessB", blockSize: 3, blockExitTime: 15, bgColor: "green", color: "white" };
  
    // Mock `checkIfRangeEmpty` to simulate which blocks are empty
    checkIfRangeEmpty.mockImplementation((start, size) => {
      if (start === 5 && size === 3) return true; // Best fit
      if (start === 0 && size === 3) return false;
      if (start === 1 && size === 3) return false;
      if (start === 2 && size === 3) return false;
      if (start === 3 && size === 3) return false;
      if (start === 4 && size === 3) return false;
      return true; // All other ranges are empty
    });
  
    // Mock memory spaces with varying block states and sizes
    getMemorySpaces.mockReturnValue([
      {
        processName: "any",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 0,
      },
      {
        processName: "any",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 1,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 2,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 3,
      },
      {
        processName: "any2",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 4,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 5, // Best fit starts here
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 6,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 7,
      },
    ]);
    findRangeOfEmpty.mockImplementation((startIndex) => {
      if (startIndex == 5){
        return 3
      }
    })
    await findBestFit(processBlock);
  
    // Ensure hover state is updated correctly for best fit
    expect(updateHoverState).toHaveBeenCalledWith(5, 3, true); // Hover on best fit (index 5)
    expect(updateHoverState).toHaveBeenCalledWith(5, 3, false); // Hover off best fit
  
    // Ensure the best fit block is allocated
    expect(allocateMemorySpace).toHaveBeenCalledWith(5, processBlock); // Allocate to index 5
    expect(renderMemorySections).toHaveBeenCalled();
  });

  
  it("Test case 5: should find and allocate the best fit block among varying sizes", async () => {
    const processBlock = { name: "ProcessB", blockSize: 3, blockExitTime: 15, bgColor: "green", color: "white" };
  
    // Mock `checkIfRangeEmpty` to simulate which blocks are empty
    checkIfRangeEmpty.mockImplementation((start, size) => {
      if (start === 2 && size === 3) return true; // is not best
      if (start === 7 && size === 3) return true; // is best
      if (start > 10 && size === 3) return true; // is not best
      if (start >= 0 && start <= 1 && size === 3) return false; 
      if (start == 6 && size === 3) return false; 
      if (start == 10 && size === 3) return false; 

      return true; // All other ranges are empty
    });
  
    // Mock memory spaces with varying block states and sizes
    getMemorySpaces.mockReturnValue([
      {
        processName: "any",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 0,
      },
      {
        processName: "any",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 1,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 2,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 3,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 4,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 5,
      },
      {
        processName: "any2",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 6,
      },
      {
        processName: "empty", 
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 7, // best fit
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 8,
      },
      {
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 9,
      },
      {
        processName: "any3",
        blockExitTime: 50,
        isActive: false,
        isHovered: false,
        wasRecentlyAdded: false,
        blockIndex: 10,
      },
    ]);
    findRangeOfEmpty.mockImplementation((startIndex) => {
      if (startIndex == 7){
        return 3
      }
      else if(startIndex == 2){
        return 4
      }
    })
  
    await findBestFit(processBlock);
  
    // Ensure hover state is updated correctly for best fit
    expect(updateHoverState).toHaveBeenCalledWith(7, 3, true); // Hover on best fit (index 7)
    expect(updateHoverState).toHaveBeenCalledWith(7, 3, false); // Hover off best fit

    expect(findRangeOfEmpty).toHaveBeenCalledTimes(2)
  
    // Ensure the best fit block is allocated
    expect(allocateMemorySpace).toHaveBeenCalledWith(7, processBlock); // Allocate to index 7
    expect(renderMemorySections).toHaveBeenCalled();
  
  });


  
});

describe("executeBestFit", () => {
  it("Test case 1: should call Display function", async () => {
    await executeBestFit();
    expect(Display).toHaveBeenCalled();
    expect(Display).toHaveBeenCalledWith("best_fit");
  });
});
