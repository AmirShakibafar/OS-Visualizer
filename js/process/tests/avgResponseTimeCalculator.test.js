import { describe, it, expect } from "vitest";
import { avgResponseTime, } from "../avgResponseTimeCalculator";



///////////////// Tests /////////////////

describe("avgResponseTime", () =>{

    it('Test case 1: ', () => {
        expect(avgResponseTime([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P2", start: 5, duration: 2, endTime: 7 },
          { name: "P3", start: 10, duration: 1, endTime: 11 }
        ])).toEqual(2); // Average Response time: (3 + 2 + 1) / 3 = 2
      });
    

      it('Test case 2: ', () => {
        expect(avgResponseTime([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P2", start: 1, duration: 2, endTime: 5 },
          { name: "P3", start: 3, duration: 1, endTime: 6 }
        ])).toEqual(10/3); // Average Response time: (3 + 4 + 3) / 3 
      });
    

      it('Test case 3: Single process', () => {
        expect(avgResponseTime([
          { name: "P1", start: 0, duration: 4, endTime: 4 }
        ])).toEqual(4); // Response time: ( 4 ) = 4
      });
    

      it('Test case 4: Processes with zero duration', () => {
        expect(avgResponseTime([
          { name: "P1", start: 0, duration: 0, endTime: 0 },
          { name: "P2", start: 1, duration: 0, endTime: 1 },
          { name: "P3", start: 2, duration: 0, endTime: 2 }
        ])).toEqual(0); // Average wait time: (0 + 0 + 0) / 3 = 0
      });
    
    
      it('Test case 5: Processes with floating-point durations', () => {
        expect(avgResponseTime([
          { name: "P1", start: 0, duration: 2.5, endTime: 2.5 },
          { name: "P2", start: 1, duration: 3.7, endTime: 6.2 },
          { name: "P3", start: 3, duration: 1.2, endTime: 7.3 }
        ])).toEqual(4); // Average Response time: (2.5 + 5.2 + 4.3) / 3 = 12/3
      });

      
      it("Test case 6: Processes with negative start times and without endTime", () => {
        expect(
          avgResponseTime([
            { name: "P1", start: -3, duration: 5, remaining: 3 },
      
            { name: "P3", start: -1, duration: 4, remaining: 2 },
            { name: "P2", start: 0, duration: 2, remaining: 0, endTime: 6 },
            { name: "P1", start: -3, duration: 5, remaining: 1 },
            
            { name: "P3", start: -1, duration: 4, remaining: 0, endTime: 10 },
            { name: "P1", start: -3, duration: 5, remaining: 0, endTime: 11 },
          ])
        ).toEqual(31/3); // Average Response time: (6 + 11 + 14) / 3 = 31/3
      });
})