import { describe, test, it, expect, vi } from "vitest";
import { 
    readIsCancelled,
    reSetIsCancelled,
    setIsCancelled
 } from "../cancelFlag";


describe("cancelFlag", () => {
    it("Test case 1: readIsCancelled() should return boolean", () => {
      expect(readIsCancelled()).toBeTypeOf("boolean");
    });

    it("Test case 2: should return false", () => {
      reSetIsCancelled();
      expect(readIsCancelled()).toBe(false);
    });

    it("Test case 3: should return true", () => {
      setIsCancelled();
      expect(readIsCancelled()).toBe(true);
    });
})



