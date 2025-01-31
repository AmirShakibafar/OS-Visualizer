import { describe, it, expect, vi, beforeEach } from "vitest";
import { findNextFit, executeNextFit, lastAllocatedIndex } from "../next_fit.js"; // Assuming the file name
import {
  getMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
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


  
describe("findWorstFit", () => {

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

  it("Test case 1: should find and allocate the next fit block", async () => {
    const processBlock1 = { name: "ProcessA", blockSize: 2, blockExitTime: 10, bgColor: "blue", color: "white" };
    const processBlock2 = { name: "ProcessB", blockSize: 2, blockExitTime: 10, bgColor: "blue", color: "white" };
    checkIfRangeEmpty.mockImplementation((start, size) => start == 0 || (start == 2));
    getMemorySpaces.mockReturnValue([
        {
            processName: "empty",
            bgColor: null,
            color: null,
            blockExitTime: null,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 0,
        },
        {
            processName: "empty",
            bgColor: null,
            color: null,
            blockExitTime: null,
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
            processName: "empty",
            bgColor: null,
            color: null,
            blockExitTime: null,
            isActive: false,
            isHovered: false,
            wasRecentlyAdded: false,
            blockIndex: 5,
        },
    ])

    await findNextFit(processBlock1);

    expect(updateHoverState).toHaveBeenCalledWith(expect.any(Number), 2, true);
    expect(updateHoverState).toHaveBeenCalledWith(expect.any(Number), 2, false);
    expect(renderMemorySections).toHaveBeenCalled();
    expect(allocateMemorySpace).toHaveBeenCalledWith(0, processBlock1); // find next fit in index 0 and allocate

    await findNextFit(processBlock2);

    expect(updateHoverState).toHaveBeenCalledWith(expect.any(Number), 2, true);
    expect(updateHoverState).toHaveBeenCalledWith(expect.any(Number), 2, false);
    expect(renderMemorySections).toHaveBeenCalled();
    expect(allocateMemorySpace).toHaveBeenCalledWith(2, processBlock2); // find next fit in index 2 and allocate
  });

  it("Test case 2: should fail to find a block if no suitable space is available", async () => {
    const processBlock = { name: "ProcessB", blockSize: 10, blockExitTime: 15 };
    checkIfRangeEmpty.mockReturnValue(false);

    await findNextFit(processBlock);
    
    expect(updateHoverState).toHaveBeenCalled();
    expect(renderMemorySections).toHaveBeenCalled();
    expect(checkIfRangeEmpty).toHaveBeenCalled();
    expect(allocateMemorySpace).not.toHaveBeenCalled();
  });

  it("Test case 3: should stop execution if cancelled", async () => {
    const processBlock = { name: "ProcessC", blockSize: 5, blockExitTime: 20 };

    readIsCancelled.mockReturnValue(true);


    await findNextFit(processBlock);

    expect(updateHoverState).toHaveBeenCalledTimes(0); // Stops after cancellation
    expect(renderMemorySections).toHaveBeenCalledTimes(0);
    expect(allocateMemorySpace).not.toHaveBeenCalled();
  });


  it("Test case 4: should find and allocate the next fit block among varying sizes", async () => {
    const processBlock1 = { name: "ProcessA", blockSize: 3, blockExitTime: 15, bgColor: "green", color: "white" };
    const processBlock2 = { name: "ProcessB", blockSize: 3, blockExitTime: 1, bgColor: "green", color: "white" };
    const processBlock3 = { name: "ProcessC", blockSize: 3, blockExitTime: 15, bgColor: "green", color: "white" };
  
    // Mock `checkIfRangeEmpty` to simulate which blocks are empty
    checkIfRangeEmpty.mockImplementation((start, size) => {
      if (start === 0 && size === 3) return true;
      if (start === 3 && size === 3) return true;
      if (start === 6 && size === 3) return true;
      return true; // All other ranges are empty
    });
  
    // Mock memory spaces with varying block states and sizes

    await findNextFit(processBlock1);
  
    // Ensure hover state is updated correctly for next fit
    expect(updateHoverState).toHaveBeenCalledWith(0, 3, true); 
    expect(updateHoverState).toHaveBeenCalledWith(0, 3, false); 
  
    // Ensure the best fit block is allocated
    expect(allocateMemorySpace).toHaveBeenCalledWith(0, processBlock1);
    expect(renderMemorySections).toHaveBeenCalled();
  
    checkIfRangeEmpty.mockImplementation((start, size) => {
        if (start === 0 && size === 3) return false;
        if (start === 3 && size === 3) return true;
        if (start === 6 && size === 3) return true;
        return true; // All other ranges are empty
      });

    await findNextFit(processBlock2);
  
    expect(updateHoverState).toHaveBeenCalledWith(3, 3, true); 
    expect(updateHoverState).toHaveBeenCalledWith(3, 3, false); 
  
    expect(allocateMemorySpace).toHaveBeenCalledWith(3, processBlock2);
    expect(renderMemorySections).toHaveBeenCalled();

    checkIfRangeEmpty.mockImplementation((start, size) => {
        if (start === 0 && size === 3) return false;
        if (start === 3 && size === 3) return false;
        if (start === 6 && size === 3) return true;
        return true; // All other ranges are empty
      });

    await findNextFit(processBlock2);
  
    expect(updateHoverState).toHaveBeenCalledWith(6, 3, true); 
    expect(updateHoverState).toHaveBeenCalledWith(6, 3, false); 
  
    expect(allocateMemorySpace).toHaveBeenCalledWith(6, processBlock2);
    expect(renderMemorySections).toHaveBeenCalled();

  });
});

describe("executeNextFit", () => {
  it("Test case 1: should call Display function", async () => {

    await executeNextFit();
    expect(Display).toHaveBeenCalled();
    expect(Display).toHaveBeenCalledWith("next_fit");
  });
});
