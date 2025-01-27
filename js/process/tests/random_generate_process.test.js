import { describe, it, expect, beforeEach, vi } from "vitest";
import { 
    generate_start_duration,
    generate_random_processes
 } from  "../random_generate_process.js";
 
 import { 
    processes,
    clearProcesses, 
    generateProcess,
    getProcesses
} from "../processes.js";



// Disable DOM
vi.mock('../process_table_elements', () => ({
    processTable: null
  }));

vi.mock("../processes.js", () => ({
  processes: [],
  generateProcess: vi.fn((start, duration) => ({ start, duration })),
  clearProcesses: vi.fn(),
  getProcesses: vi.fn((processes) => {return []}),
}));
  



/////////////////////////////     Tests    ////////////////////////////

describe('generate_start_duration', () => {
        it('Test case 1: should return an array with two numbers', () => {
          const result = generate_start_duration();
          expect(result).toHaveLength(2); // Ensure the array has two elements
          expect(typeof result[0]).toBe('number');
          expect(typeof result[1]).toBe('number');
        });
      
        it('Test case 2: should ensure both numbers are between 1 and 20 inclusive', () => {
          for (let i = 0; i < 100; i++) { // Test multiple iterations
            const [start, duration] = generate_start_duration();
            expect(start).toBeGreaterThanOrEqual(1);
            expect(start).toBeLessThanOrEqual(20);
            expect(duration).toBeGreaterThanOrEqual(1);
            expect(duration).toBeLessThanOrEqual(20);
          }
        });
      
        it('Test case 3: should produce random results over multiple calls', () => {
          const results = new Set();
          for (let i = 0; i < 100; i++) {
            results.add(generate_start_duration().join(',')); // Add unique results
          }
          expect(results.size).toBeGreaterThan(1); // Ensure randomness
        });


})



describe("generate_random_processes", () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        processes = []
    })
  
    it("Test case 1: should clear existing processes", () => {
        generate_random_processes(3);
        expect(clearProcesses).toHaveBeenCalledTimes(1); // Ensure processes are cleared
      });
    
      it("Test case 2: should generate the correct number of processes", () => {
        generate_random_processes(5);
        expect(getProcesses).toHaveBeenCalledTimes(5); // Ensure 5 processes are generated
        expect(generateProcess).toHaveBeenCalledTimes(5); // Ensure 5 processes are generated
      });
    
      it("Test case 3: should populate the processes array with valid data", () => {
        generate_random_processes(3);
        processes.forEach((process) => {
          expect(process).toHaveProperty("start");
          expect(process).toHaveProperty("duration");
          expect(process.start).toBeGreaterThanOrEqual(1);
          expect(process.start).toBeLessThanOrEqual(20);
          expect(process.duration).toBeGreaterThanOrEqual(1);
          expect(process.duration).toBeLessThanOrEqual(20);
        });
      });
    
      it("Test case 4: should handle generating zero processes gracefully", () => {
        generate_random_processes(0);
        expect(processes).toHaveLength(0); // No processes should be added
        expect(clearProcesses).toHaveBeenCalled(); // Processes should still be cleared
      });
});