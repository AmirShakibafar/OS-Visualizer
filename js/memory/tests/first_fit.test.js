import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeFirstFit, findFirstFit } from "../first_fit"; // Assuming the file name
import {
  getMemorySpaces,
  clearMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
  deAllocateMemorySpace,
} from "../memory_space.js";
import { sleep } from "../../helpers/helpers";
import { renderMemorySections } from "../memory_table";
import { showMessage } from "../../helpers/message";
import { currentSpeed } from "../speed";
import { updateTime, resetTime } from "../timer.js";
import { getMemoryBlocks } from "../memory_blocks.js";

// Mock dependencies
vi.mock("../memory_space", () => ({
  getMemorySpaces: vi.fn(),
  allocateMemorySpace: vi.fn(),
  checkIfRangeEmpty: vi.fn(),
  updateHoverState: vi.fn(),
  clearMemorySpaces: vi.fn(),
  deAllocateMemorySpace: vi.fn()
}));


vi.mock('../../helpers/message', () => ({
  showMessage: vi.fn(),
  messageBox: null
}));

vi.mock("../../helpers/helpers", () => ({
  sleep: vi.fn(() => Promise.resolve()),
}));

vi.mock("../memory_table", () => ({
  renderMemorySections: vi.fn(),
}));

vi.mock("../helpers/message", () => ({
  showMessage: vi.fn(),
}));

vi.mock("../speed", () => ({
  currentSpeed: 1,
}));

vi.mock("../timer", () => ({
  updateTime: vi.fn(),
  resetTime: vi.fn(),
}));

vi.mock("../memory_blocks", () => ({
  getMemoryBlocks: vi.fn(),
}));


describe("findFirstFit", () => {
  const mockIsCancelled = vi.fn();

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
    mockIsCancelled.mockReturnValue(false);
  });

  it("Test case 1: should find and allocate the first available block", async () => {
    const processBlock = { name: "ProcessA", blockSize: 5, blockExitTime: 10, bgColor: "blue", color: "white" };
    checkIfRangeEmpty.mockReturnValue(true);

    await findFirstFit(processBlock, mockIsCancelled);

    expect(updateHoverState).toHaveBeenCalledTimes(2);
    expect(updateHoverState).toHaveBeenCalledWith(0, 5, true); // Hover on
    expect(updateHoverState).toHaveBeenCalledWith(0, 5, false); // Hover off
    expect(renderMemorySections).toHaveBeenCalled();
    expect(checkIfRangeEmpty).toHaveBeenCalledWith(0, 5);
    expect(allocateMemorySpace).toHaveBeenCalledWith(0, processBlock);
    expect(showMessage).toHaveBeenCalledWith("found empty block for ProcessA at index: 0", "success");
  });

  it("Test case 2: should fail to find a block if no space is available", async () => {
    const processBlock = { name: "ProcessB", blockSize: 10, blockExitTime: 15 };
    checkIfRangeEmpty.mockReturnValue(false);

    await findFirstFit(processBlock, mockIsCancelled);

    expect(updateHoverState).toHaveBeenCalled();
    expect(renderMemorySections).toHaveBeenCalled();
    expect(checkIfRangeEmpty).toHaveBeenCalled();
    expect(allocateMemorySpace).not.toHaveBeenCalled();
    expect(showMessage).toHaveBeenCalledWith("No available memory block found for ProcessB!", "fail");
  });

  it("Test case 3: should handle memory wrapping around the end of the array", async () => {
    const processBlock = { name: "ProcessC", blockSize: 5, blockExitTime: 20 };
    checkIfRangeEmpty.mockImplementation((start, size) => start === 59 && size === 5);

    await findFirstFit(processBlock, mockIsCancelled);
    expect(updateHoverState).toHaveBeenCalledTimes(120)
    for(let i = 0; i < 60; i++){
      expect(updateHoverState).toHaveBeenCalledWith(i, 5, true); // Hover on
      expect(updateHoverState).toHaveBeenCalledWith(i, 5, false); // Hover off
    }
    expect(allocateMemorySpace).toHaveBeenCalledWith(59, processBlock);
    expect(showMessage).toHaveBeenCalledWith("found empty block for ProcessC at index: 59", "success");
  });

  it("Test case 4: should stop execution if cancelled ", async () => {
    const processBlock = { name: "ProcessD", blockSize: 5, blockExitTime: 25 };
    mockIsCancelled.mockReturnValueOnce(true);

    await findFirstFit(processBlock, mockIsCancelled);

    expect(updateHoverState).toHaveBeenCalledTimes(0); // Stops after cancellation
    expect(renderMemorySections).toHaveBeenCalledTimes(0);
    expect(allocateMemorySpace).not.toHaveBeenCalled();
    expect(showMessage).not.toHaveBeenCalledWith(
      expect.stringContaining("found empty block"),
      "success"
    );
  });

  it("Test case 5: should correctly allocate in a fragmented memory scenario", async () => {
    const memorySpaces = getMemorySpaces.mockReturnValue([
      ...Array.from({ length: 30 }, () => ({ processName: "ProcessX", isActive: true })),
      ...Array.from({ length: 5 }, () => ({ processName: "empty", isActive: false })),
      ...Array.from({ length: 29 }, () => ({ processName: "ProcessY", isActive: true })),
    ]);

    const processBlock = { name: "ProcessE", blockSize: 5, blockExitTime: 30 };
    checkIfRangeEmpty.mockImplementation((start, size) => start === 30 && size === 5);

    await findFirstFit(processBlock, mockIsCancelled);

    expect(updateHoverState).toHaveBeenCalledWith(30, 5, true);
    expect(allocateMemorySpace).toHaveBeenCalledWith(30, processBlock);
    expect(renderMemorySections).toHaveBeenCalled();
    expect(showMessage).toHaveBeenCalledWith("found empty block for ProcessE at index: 30", "success");
  });
});


describe("executeFirstFit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearMemorySpaces.mockClear();
    resetTime.mockClear();
    updateTime.mockClear();
    allocateMemorySpace.mockClear();
    getMemorySpaces.mockReturnValue(
      Array.from({ length: 64 }, (_, i) => ({
        processName: "empty",
        blockExitTime: null,
        isActive: false,
        blockIndex: i,
      }))
    );
  });
/*
  it("Test case 1: should allocate memory for all processes in order", async () => {
    getMemoryBlocks.mockReturnValue([
      { name: "Process1", blockSize: 5, blockArrival: 0, blockExitTime: 10 },
      { name: "Process2", blockSize: 10, blockArrival: 5, blockExitTime: 15 },
    ]);
    await executeFirstFit(() => false);

    expect(clearMemorySpaces).toHaveBeenCalled();
    expect(resetTime).toHaveBeenCalled();
    expect(allocateMemorySpace).toHaveBeenCalledTimes(2);
    expect(allocateMemorySpace).toHaveBeenCalledWith(0, {
      name: "Process1",
      blockSize: 5,
      blockArrival: 0,
      blockExitTime: 10,
    });
    expect(allocateMemorySpace).toHaveBeenCalledWith(5, {
      name: "Process2",
      blockSize: 10,
      blockArrival: 5,
      blockExitTime: 15,
    });
    expect(renderMemorySections).toHaveBeenCalled();
    expect(showMessage).toHaveBeenCalledWith(
      "found empty block for Process1 at index: 0",
      "success"
    );
  });
*/
  it("Test case 2: should fail to allocate memory when no space is available", async () => {
    getMemoryBlocks.mockReturnValue([
      { name: "Process1", blockSize: 65, blockArrival: 0, blockExitTime: 10 },
    ]);
    await executeFirstFit(() => false);

    expect(clearMemorySpaces).toHaveBeenCalled();
    expect(resetTime).toHaveBeenCalled();
    expect(allocateMemorySpace).not.toHaveBeenCalled();
    expect(showMessage).toHaveBeenCalledWith(
      "No available memory block found for Process1!",
      "fail"
    );
  });
/*
  it("Test case 3: should deallocate memory as time progresses", async () => {
    getMemoryBlocks.mockReturnValue([
      { name: "Process1", blockSize: 5, blockArrival: 0, blockExitTime: 10 },
    ]);

    deAllocateMemorySpace.mockImplementation((currTick) => {
      if (currTick >= 10) {
        getMemorySpaces.mockReturnValueOnce(
          Array.from({ length: 64 }, (_, i) => ({
            processName: "empty",
            blockExitTime: null,
            isActive: false,
            blockIndex: i,
          }))
        );
        return true;
      }
      return false;
    });

    await executeFirstFit(() => false);

    expect(deAllocateMemorySpace).toHaveBeenCalled();
    expect(updateTime).toHaveBeenCalledWith(10);
  });
*/
  it("Test case 4: should stop execution if cancelled", async () => {
    getMemoryBlocks.mockReturnValue([
      { name: "Process1", blockSize: 5, blockArrival: 0, blockExitTime: 10 },
      { name: "Process2", blockSize: 10, blockArrival: 5, blockExitTime: 15 },
    ]);

    const isCancelled = vi.fn();
    isCancelled.mockReturnValueOnce(true);

    await executeFirstFit(isCancelled);

    expect(allocateMemorySpace).toHaveBeenCalledTimes(0);
    expect(isCancelled).toHaveBeenCalled();
  });
/*
  it("Test case 5: should handle cyclic memory allocation", async () => {
    getMemoryBlocks.mockReturnValue([
      { name: "Process1", blockSize: 5, blockArrival: 0, blockExitTime: 10 },
      { name: "Process2", blockSize: 60, blockArrival: 5, blockExitTime: 15 },
    ]);

    await executeFirstFit(() => false);

    expect(allocateMemorySpace).toHaveBeenCalledTimes(2);
    expect(allocateMemorySpace).toHaveBeenCalledWith(0, {
      name: "Process1",
      blockSize: 5,
      blockArrival: 0,
      blockExitTime: 10,
    });
    expect(allocateMemorySpace).toHaveBeenCalledWith(5, {
      name: "Process2",
      blockSize: 60,
      blockArrival: 5,
      blockExitTime: 15,
    });
  });
*/
  it("Test case 6: should continue processing after deallocation", async () => {
    getMemoryBlocks.mockReturnValue([
      { name: "Process1", blockSize: 5, blockArrival: 0, blockExitTime: 5 },
      { name: "Process2", blockSize: 5, blockArrival: 6, blockExitTime: 15 },
    ]);

    deAllocateMemorySpace.mockReturnValueOnce(true).mockReturnValueOnce(false);

    await executeFirstFit(() => false);

    expect(deAllocateMemorySpace).toHaveBeenCalled();
    expect(allocateMemorySpace).toHaveBeenCalledTimes(2);
  });
});