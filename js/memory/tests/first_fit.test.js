import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeFirstFit, findFirstFit } from "../first_fit"; // Assuming the file name
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
  deAllocateMemorySpace: vi.fn()
}));

vi.mock("../display", () => ({
  Display: vi.fn(),
}))


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


vi.mock('../../helpers/speed.js', () => ({
  SPEED : 1,
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


describe("findFirstFit", () => {

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
  });

  it("Test case 1: should find and allocate the first available block", async () => {
    const processBlock = { name: "ProcessA", blockSize: 5, blockExitTime: 10, bgColor: "blue", color: "white" };
    checkIfRangeEmpty.mockReturnValue(true);

    await findFirstFit(processBlock);

    expect(updateHoverState).toHaveBeenCalledTimes(2);
    expect(updateHoverState).toHaveBeenCalledWith(0, 5, true); // Hover on
    expect(updateHoverState).toHaveBeenCalledWith(0, 5, false); // Hover off
    expect(renderMemorySections).toHaveBeenCalled();
    expect(checkIfRangeEmpty).toHaveBeenCalledWith(0, 5);
    expect(allocateMemorySpace).toHaveBeenCalledWith(0, processBlock);
  });

  it("Test case 2: should fail to find a block if no space is available", async () => {
    const processBlock = { name: "ProcessB", blockSize: 10, blockExitTime: 15 };
    checkIfRangeEmpty.mockReturnValue(false);

    await findFirstFit(processBlock);

    expect(updateHoverState).toHaveBeenCalled();
    expect(renderMemorySections).toHaveBeenCalled();
    expect(checkIfRangeEmpty).toHaveBeenCalled();
    expect(allocateMemorySpace).not.toHaveBeenCalled();
  });

  it("Test case 3: should handle memory wrapping around the end of the array", async () => {
    const processBlock = { name: "ProcessC", blockSize: 5, blockExitTime: 20 };
    checkIfRangeEmpty.mockImplementation((start, size) => start === 59 && size === 5);

    await findFirstFit(processBlock);
    expect(updateHoverState).toHaveBeenCalledTimes(120)
    for(let i = 0; i < 60; i++){
      expect(updateHoverState).toHaveBeenCalledWith(i, 5, true); // Hover on
      expect(updateHoverState).toHaveBeenCalledWith(i, 5, false); // Hover off
    }
    expect(allocateMemorySpace).toHaveBeenCalledWith(59, processBlock);
  });

  it("Test case 4: should stop execution if cancelled ", async () => {
    const processBlock = { name: "ProcessD", blockSize: 5, blockExitTime: 25 };
    readIsCancelled.mockReturnValue(true);

    await findFirstFit(processBlock);

    expect(updateHoverState).toHaveBeenCalledTimes(0); // Stops after cancellation
    expect(renderMemorySections).toHaveBeenCalledTimes(0);
    expect(allocateMemorySpace).not.toHaveBeenCalled();
  });

  it("Test case 5: should correctly allocate in a fragmented memory scenario", async () => {
    const memorySpaces = getMemorySpaces.mockReturnValue([
      ...Array.from({ length: 30 }, () => ({ processName: "ProcessX", isActive: true })),
      ...Array.from({ length: 5 }, () => ({ processName: "empty", isActive: false })),
      ...Array.from({ length: 29 }, () => ({ processName: "ProcessY", isActive: true })),
    ]);
    readIsCancelled.mockReturnValue(false);
    const processBlock = { name: "ProcessE", blockSize: 5, blockExitTime: 30 };
    checkIfRangeEmpty.mockImplementation((start, size) => start === 30 && size === 5);

    await findFirstFit(processBlock);

    expect(updateHoverState).toHaveBeenCalledWith(30, 5, true);
    expect(allocateMemorySpace).toHaveBeenCalledWith(30, processBlock);
    expect(renderMemorySections).toHaveBeenCalled();
  });
});


describe("executeFirstFit", () =>{
  it("Test case 1: should call Display function", async () =>{
    await executeFirstFit()
    expect(Display).toHaveBeenCalled()
    expect(Display).toBeCalledWith("first_fit")
  })
})