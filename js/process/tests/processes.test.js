import { describe, test, it, expect, beforeEach, vi } from "vitest";
import { generateProcess, processes, clearProcesses } from "../processes";
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
      processes.push({});
  
      // Act
      const start = 5;
      const duration = 15;
      const process = generateProcess(start, duration);
  
      // Assert
      expect(process.name).toBe("P1");
    });
  });
describe("clearProcesses", () => {
    beforeEach(() => {
      // Clear mocks and reset the processes array
      vi.clearAllMocks;
      processes.length = 0;
    });
  
    it("Test case 1: delete all processes", () => {
  
     processes = [{value:'some stuff 1'},{value:'some stuff 2'}]
     clearProcesses();
     expect(processes.length).toBe(0);
    });
  });
