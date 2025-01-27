import { describe, beforeEach, it, expect, vi } from "vitest";
import { avgWaitTime, } from "../avgWaitTimeCalculator";



///////////////// Tests /////////////////

describe("Calculate average wait time:", () =>{

    it('Test case 1: No waiting time for all processes', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P2", start: 5, duration: 2, endTime: 7 },
          { name: "P3", start: 10, duration: 1, endTime: 11 }
        ])).toEqual(0); // Average wait time: (0 + 0 + 0) / 3 = 0
      });
    

      it('Test case 2: Most processes with the same wait time', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P2", start: 1, duration: 2, endTime: 5 },
          { name: "P3", start: 3, duration: 1, endTime: 6 }
        ])).toEqual(4/3); // Average wait time: (0 + 2 + 2) / 3 = 4
      });
    

      it('Test case 3: Mixed wait times for processes', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 4, endTime: 4 },
          { name: "P2", start: 1, duration: 5, endTime: 9 },
          { name: "P3", start: 2, duration: 3, endTime: 12 }
        ])).toEqual(10/3); // Average wait time: (0 + 3 + 7) / 3 = 10/3
      });
    

      it('Test case 4: Single process', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 4, endTime: 4 }
        ])).toEqual(0); // Wait time: ( 0 ) = 0
      });
    

      it('Test case 5: Processes with zero duration', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 0, endTime: 0 },
          { name: "P2", start: 1, duration: 0, endTime: 1 },
          { name: "P3", start: 2, duration: 0, endTime: 2 }
        ])).toEqual(0); // Average wait time: (0 + 0 + 0) / 3 = 0
      });
    

      it('Test case 6: Large input with different wait times', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 5, endTime: 5 },
          { name: "P2", start: 2, duration: 3, endTime: 8 },
          { name: "P3", start: 4, duration: 7, endTime: 15 },
          { name: "P4", start: 6, duration: 4, endTime: 19 },
          { name: "P5", start: 8, duration: 2, endTime: 21 }
        ])).toEqual(27/5); // Average wait time: (0 + 3 + 4 + 9 + 11) / 5 = 27/5
      });
    
    
      it('Test case 7: Processes with floating-point durations', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 2.5, endTime: 2.5 },
          { name: "P2", start: 1, duration: 3.7, endTime: 6.2 },
          { name: "P3", start: 3, duration: 1.2, endTime: 7.4 }
        ])).toEqual(4.7/3); // Average wait time: (0 + 1.5 + 3.2) / 3 = 4.7/3
      });

      
      it('Test case 8: Large processes with varying durations and start times', () => {
        expect(avgWaitTime([
          { name: "P1", start: 0, duration: 10, endTime: 10 },
          { name: "P2", start: 5, duration: 15, endTime: 25 },
          { name: "P3", start: 10, duration: 20, endTime: 45 },
          { name: "P4", start: 15, duration: 25, endTime: 70 },
          { name: "P5", start: 20, duration: 30, endTime: 100 }
        ])).toEqual(20); // Average wait time: (0 + 5 + 15 + 30 + 50) / 5 = 20
      });

      it("Test case 9: Processes with negative start times and without endTime", () => {
        expect(
          avgWaitTime([
            { name: "P1", start: -3, duration: 5, remaining: 3 },
      
            { name: "P3", start: -1, duration: 4, remaining: 2 },
            { name: "P2", start: 0, duration: 2, remaining: 0, endTime: 6 },
            { name: "P1", start: -3, duration: 5, remaining: 1 },
            
            { name: "P3", start: -1, duration: 4, remaining: 0, endTime: 10 },
            { name: "P1", start: -3, duration: 5, remaining: 0, endTime: 11 },
          ])
        ).toEqual(20/3); // Average wait time: (4 + 7 + 9) / 3 = 20/3
      });
})