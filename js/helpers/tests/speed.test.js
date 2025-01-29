import { describe, it, expect } from "vitest";
import { 
    setAnimationSpeed,
    SPEED
 } from "../speed";


describe("setAnimationSpeed", () => {
    it("Test case 1: should set new value to speed", () => {
      setAnimationSpeed(100);
      expect(SPEED).toBe(100);

      setAnimationSpeed(500);
      expect(SPEED).toBe(500);
    });

})
