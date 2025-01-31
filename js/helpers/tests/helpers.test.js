import { describe, it, expect } from "vitest";
import { 
    generate_random_color,
    generateAccentColor,
    sleep
 } from "../helpers";


describe("generate_random_color", () => {
    it("Test case 1: should return a string in the format 'rgb(x, y, z)'", () => {
      const color = generate_random_color();
      expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    });
    
      it("Test case 2: should generate random values for multiple calls", () => {
        const colors = new Set();
        for (let i = 0; i < 10; i++) {
          colors.add(generate_random_color());
        }
        expect(colors.size).toBeGreaterThan(1); // Ensure at least two different colors
      });

      it("Test case 3: should return a string as the output", () => {
        const color = generate_random_color();
        expect(typeof color).toBe("string");
      });

      it("Test case 4: should ensure values are within the range [20, 255]", () => {
        for (let i = 0; i < 1000; i++) {
          const color = generate_random_color();
          const [r, g, b] = color.match(/\d+/g).map(Number);
          expect(r).toBeGreaterThanOrEqual(20);
          expect(r).toBeLessThanOrEqual(255);
          expect(g).toBeGreaterThanOrEqual(20);
          expect(g).toBeLessThanOrEqual(255);
          expect(b).toBeGreaterThanOrEqual(20);
          expect(b).toBeLessThanOrEqual(255);
        }
      });

      it("Test case 5: should execute within reasonable time for multiple calls", () => {
        const start = performance.now();
        for (let i = 0; i < 1000000; i++) {
          generate_random_color();
        }
        const end = performance.now();
        expect(end - start).toBeLessThan(1000); // Should take less than 1 second
      });

})



describe("generateAccentColor", () => {
    it("Test case 1: should return a valid accent color with default parameters", () => {
      const color = generateAccentColor();
      expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    });

    it("Test case 2: should fall back to a default color if contrast is unachievable", () => {
      const color = generateAccentColor("rgb(255, 255, 255)", 21);
      expect(color).toBe("rgb(0, 0, 0)");
    });

  });



describe("sleep", () => {
    it("Test case 1: should resolve after approximately the specified time", async () => {
      const start = Date.now();
      await sleep(200); // 200ms delay
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(180);
      expect(end - start).toBeLessThan(320); // Allow for small execution overhead
    });
  
    it("Test case 2: should resolve immediately when passed 0", async () => {
      const start = Date.now();
      await sleep(0); // No delay
      const end = Date.now();
      expect(end - start).toBeLessThan(20); // Practically no delay
    });
  
    it("Test case 3: should handle negative delay values gracefully", async () => {
      const start = Date.now();
      await sleep(-100); // Negative delay, treated as no delay
      const end = Date.now();
      expect(end - start).toBeLessThan(20);
    });
  
    it("Test case 4: should work with a large delay value", async () => {
      const timeout = 1000; // 1 second
      const start = Date.now();
      await sleep(timeout);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(timeout-10);
      expect(end - start).toBeLessThan(timeout + 120); // Small margin for overhead
    });
  
    it("Test case 5: should return a promise that resolves", async () => {
      const promise = sleep(100);
      expect(promise).toBeInstanceOf(Promise);
  
      let resolved = false;
      await promise.then(() => {
        resolved = true;
      });
      expect(resolved).toBe(true);
    });
  
    it("Test case 6: should allow multiple sleep calls to work independently", async () => {
      const results = [];
      const start = Date.now();
  
      await Promise.all([
        sleep(200).then(() => results.push("200ms")),
        sleep(100).then(() => results.push("100ms")),
      ]);
  
      const end = Date.now();
      expect(results).toEqual(["100ms", "200ms"]);
      expect(end - start).toBeGreaterThanOrEqual(180);
    });
  
    it("Test case 7: should delay execution even in async-await chains", async () => {
      const results = [];
      const start = Date.now();
  
      results.push("start");
      await sleep(100);
      results.push("after 100ms");
      await sleep(200);
      results.push("after 200ms");
  
      const end = Date.now();
      expect(results).toEqual(["start", "after 100ms", "after 200ms"]);
      expect(end - start).toBeGreaterThanOrEqual(280);
    });
  
    it("Test case 8: should work correctly in loops with delays", async () => {
      const delays = [100, 200, 300];
      const results = [];
      const start = Date.now();
  
      for (const delay of delays) {
        await sleep(delay);
        results.push(Date.now() - start);
      }
  
      expect(results[0]).toBeGreaterThanOrEqual(80);
      expect(results[1]).toBeGreaterThanOrEqual(280);
      expect(results[2]).toBeGreaterThanOrEqual(580);
    });
  
    it("Test case 9: should handle invalid input gracefully", async () => {
      const start = Date.now();
      await sleep("invalid"); // Non-numeric input
      const end = Date.now();
      expect(end - start).toBeLessThan(40); // Treated as no delay
    });
  
  });