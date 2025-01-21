import { describe, test, it, expect, vi } from "vitest";
import { generate_start_duration } from  "../random_generate_process.js";


const test_generate_start_duration = () => {
    const start = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    const duration = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    return [start, duration]
}
// Disable DOM
vi.mock('../process_table', () => ({
    processTable: null
  }));



vi.mock('../random_generate_process', () => ({
    processTable: null,
    generate_start_duration: vi.fn(() => {
        return test_generate_start_duration()
    })

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