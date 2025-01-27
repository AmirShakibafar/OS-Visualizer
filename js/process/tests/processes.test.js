import { describe, it, expect, beforeEach, vi } from "vitest";
import { generateProcess, processes ,getProcesses, clearProcesses } from "../processes";
import { generate_random_color, generateAccentColor } from "../../helpers/helpers.js";

vi.mock('../../helpers/helpers.js', () => ({
    generate_random_color: vi.fn(() => {return "rgb(50,50,50)"}), 
    generateAccentColor: vi.fn((s) => {return "rgb(50,50,50)"}), 
}));


describe("generateProcess", () => {
    beforeEach(() => {
      // Clear mocks and reset the processes array
      vi.clearAllMocks;
      processes.length = 0;
    });
  
    it("Test case 1: should generate a process object with correct properties", () => {
  
      // Act
      const start = 0;
      const duration = 10;
  
      // Assert
      expect(generateProcess(start, duration)).toStrictEqual({
        name: "P0",
        start: start,
        duration: duration,
        bgcolor: "rgb(50,50,50)",
        color: "rgb(50,50,50)",
      });
  
      // Verify that the mocks were called as expected
      expect(generate_random_color).toHaveBeenCalledTimes(1);
      expect(generateAccentColor).toHaveBeenCalledTimes(1);
      expect(generateAccentColor).toHaveBeenCalledWith("rgb(50,50,50)");
    });
  
    it("Test case 2: should increment the process name based on the length of processes array", () => {
      // Add a mock process to the processes array
      processes.push({})
  
      // Act
      const start = 5;
      const duration = 15;
      const process0 = generateProcess(start, duration);
      processes.push(process0);
      const process1 = generateProcess(start, duration);
  
      // Assert
      expect(process0.name).toBe("P1");
      expect(process1.name).toBe("P2");

    });
  });

describe("clearProcesses", () => {
    beforeEach(() => {
      // Clear mocks and reset the processes array
      vi.clearAllMocks;
    });
  
    it("Test case 1: should delete all processes", () => {
     processes.push({})
     clearProcesses();
     let processes_ = getProcesses();
     expect(processes_.length).toBe(0);
    });
  });

  describe("getProcesses", () => {
    beforeEach(() => {
      // Clear mocks and reset the processes array
      vi.clearAllMocks;
    });
  
    it("Test case 1: should return all processes", () => {
     processes.push({})
     processes.push({})
     let processes_ = getProcesses();
     expect(processes_.length).toBe(2);
     expect(processes_).toStrictEqual([{},{}]);
    });
  });
