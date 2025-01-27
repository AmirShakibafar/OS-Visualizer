import { describe, test, it, expect, vi } from "vitest";
import { SPN, SPNProcessSort } from  "../SPN.js"
import { avgWaitTime, ShowAvgWaitTime } from "../avgWaitTimeCalculator.js"
import { Display,  } from "../display.js";
import { avgResponseTime, ShowAvgResponseTime } from "../avgResponseTimeCalculator.js"


// Disable DOM & Mock functions
vi.mock('../process_table', () => ({
    processTable: null
}));
vi.mock('../manual_add_process', () => ({
    policy: null
}));
vi.mock('../timing_policies', () => ({
    policy: null
}));
vi.mock('../animation_table', () => ({
    policy: null,
}));
vi.mock('../avgWaitTimeCalculator', () => ({
    avgWaitTime: vi.fn((s) => {return 1}),
    ShowAvgWaitTime: vi.fn(),    
}));
vi.mock('../avgResponseTimeCalculator', () => ({
  avgResponseTime: vi.fn(),
  ShowAvgResponseTime: vi.fn(),
}));
vi.mock('../display', () => ({
    Display: vi.fn((s) => {return}),
}));
vi.mock('../context_switch', () => ({
  contextSwitch: 0,
  getContextSwitch: vi.fn(() => {return 0}),
}));



/////////////////////////////     Tests    ////////////////////////////

describe('SPNProcessSort', () => {
    it('Test case 1: Processes with no overlap', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 1, duration: 3 },
          { name: "P2", start: 5, duration: 2 },
          { name: "P3", start: 10, duration: 1 }
        ],0)).toStrictEqual([
          { name: "P1", start: 1, duration: 3, endTime: 4 },
          { name: "P2", start: 5, duration: 2, endTime: 7 },
          { name: "P3", start: 10, duration: 1, endTime: 11 }
        ]);
      });
    

      it('Test case 2: Processes with overlapping start times', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 0, duration: 3 },
          { name: "P2", start: 1, duration: 5 },
          { name: "P3", start: 2, duration: 2 }
        ],0)).toStrictEqual([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P3", start: 2, duration: 2, endTime: 5 },
          { name: "P2", start: 1, duration: 5, endTime: 10 }
        ]);
      });
    

      it('Test case 3: Processes starting at the same time', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 0, duration: 4 },
          { name: "P2", start: 0, duration: 2 },
          { name: "P3", start: 0, duration: 3 }
        ],0)).toStrictEqual([
          { name: "P2", start: 0, duration: 2, endTime: 2 },
          { name: "P3", start: 0, duration: 3, endTime: 5 },
          { name: "P1", start: 0, duration: 4, endTime: 9 }
        ]);
      });
    

      it('Test case 4: Processes with large durations', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 0, duration: 100 },
          { name: "P2", start: 5, duration: 50 },
          { name: "P3", start: 10, duration: 200 }
        ],0)).toStrictEqual([
          { name: "P1", start: 0, duration: 100, endTime: 100 },
          { name: "P2", start: 5, duration: 50, endTime: 150 },
          { name: "P3", start: 10, duration: 200, endTime: 350 }
        ]);
      });
    

      it('Test case 5: Processes with mixed start times', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 3, duration: 4 },
          { name: "P2", start: 0, duration: 5 },
          { name: "P3", start: 1, duration: 2 }
        ],0)).toStrictEqual([
          { name: "P2", start: 0, duration: 5, endTime: 5 },
          { name: "P3", start: 1, duration: 2, endTime: 7 },
          { name: "P1", start: 3, duration: 4, endTime: 11 }
        ]);
      });
    

      it('Test case 6: Single process', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 5, duration: 10 }
        ],0)).toStrictEqual([
          { name: "P1", start: 5, duration: 10, endTime: 15 }
        ]);
      });
    

      it('Test case 7: Processes with identical start and duration times', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 1, duration: 3 },
          { name: "P2", start: 1, duration: 3 },
          { name: "P3", start: 1, duration: 3 }
        ],0)).toStrictEqual([
          { name: "P1", start: 1, duration: 3, endTime: 4 },
          { name: "P2", start: 1, duration: 3, endTime: 7 },
          { name: "P3", start: 1, duration: 3, endTime: 10 }
        ]);
      });
    

      it('Test case 8: Processes with zero duration', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 0, duration: 0 },
          { name: "P2", start: 2, duration: 4 },
          { name: "P3", start: 3, duration: 0 }
        ],0)).toStrictEqual([
          { name: "P1", start: 0, duration: 0, endTime: 0 },
          { name: "P2", start: 2, duration: 4, endTime: 6 },
          { name: "P3", start: 3, duration: 0, endTime: 6 }
        ]);
      });
    
      
      it('Test case 9: Processes with floating-point durations', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 0, duration: 2.5 },
          { name: "P2", start: 1, duration: 3.7 },
          { name: "P3", start: 3, duration: 1.2 }
        ],0)).toStrictEqual([
          { name: "P1", start: 0, duration: 2.5, endTime: 2.5 },
          { name: "P2", start: 1, duration: 3.7, endTime: 6.2 },
          { name: "P3", start: 3, duration: 1.2, endTime: 7.4 }
        ]);
      });
    

      it('Test case 10: Processes with negative start times', () => {
        expect(SPNProcessSort([
          { name: "P1", start: -3, duration: 5 },
          { name: "P2", start: 0, duration: 2 },
          { name: "P3", start: -1, duration: 4 }
        ],0)).toStrictEqual([
          { name: "P2", start: 0, duration: 2, endTime: 2 },
          { name: "P3", start: -1, duration: 4, endTime: 6 },
          { name: "P1", start: -3, duration: 5, endTime: 11 }
        ]);
      });


      it('Test case 11: Large input with 20 processes', () => {
        expect(SPNProcessSort([
          { name: "P1", start: 0, duration: 5 },
          { name: "P2", start: 2, duration: 3 },
          { name: "P3", start: 4, duration: 7 },
          { name: "P4", start: 1, duration: 2 },
          { name: "P5", start: 3, duration: 1 },
          { name: "P6", start: 5, duration: 4 },
          { name: "P7", start: 6, duration: 6 },
          { name: "P8", start: 8, duration: 5 },
          { name: "P9", start: 7, duration: 3 },
          { name: "P10", start: 9, duration: 2 },
          { name: "P11", start: 10, duration: 4 },
          { name: "P12", start: 11, duration: 3 },
          { name: "P13", start: 12, duration: 6 },
          { name: "P14", start: 13, duration: 2 },
          { name: "P15", start: 14, duration: 3 },
          { name: "P16", start: 15, duration: 7 },
          { name: "P17", start: 16, duration: 5 },
          { name: "P18", start: 17, duration: 4 },
          { name: "P19", start: 18, duration: 6 },
          { name: "P20", start: 19, duration: 3 }
        ],0)).toStrictEqual([
          { name: "P1", start: 0, duration: 5, endTime: 5 },
          { name: "P5", start: 3, duration: 1, endTime: 6 },
          { name: "P4", start: 1, duration: 2, endTime: 8 },
          { name: "P2", start: 2, duration: 3, endTime: 11 },
          { name: "P10", start: 9, duration: 2, endTime: 13 },
          { name: "P14", start: 13, duration: 2, endTime: 15 },
          { name: "P9", start: 7, duration: 3, endTime: 18 },
          { name: "P12", start: 11, duration: 3, endTime: 21 },
          { name: "P15", start: 14, duration: 3, endTime: 24 },
          { name: "P20", start: 19, duration: 3, endTime: 27 },
          { name: "P6", start: 5, duration: 4, endTime: 31 },
          { name: "P11", start: 10, duration: 4, endTime: 35 },
          { name: "P18", start: 17, duration: 4, endTime: 39 },
          { name: "P8", start: 8, duration: 5, endTime: 44 },
          { name: "P17", start: 16, duration: 5, endTime: 49 },
          { name: "P7", start: 6, duration: 6, endTime: 55 },
          { name: "P13", start: 12, duration: 6, endTime: 61 },
          { name: "P19", start: 18, duration: 6, endTime: 67 },
          { name: "P3", start: 4, duration: 7, endTime: 74 },
          { name: "P16", start: 15, duration: 7, endTime: 81 }
        ]);
      });
})


describe('SPN', () => {
  it('Test case 1: sould send correct value to another functions', async () => {
    const processes = [
      { name: "P1", start: 0, duration: 5 },
      { name: "P2", start: 3, duration: 7 },
    ];
    const sortedProcesses = [
      { name: "P1", start: 0, duration: 5, endTime:5 },
      { name: "P2", start: 3, duration: 7, endTime:12 },
    ];

    await SPN(processes)
    expect(processes.every(p => p.endTime !== undefined)).toBe(true);
    //expect(SPNProcessSort).toHaveBeenCalledWith(processes);
    expect(avgWaitTime).toHaveBeenCalledWith(sortedProcesses);
    expect(avgResponseTime).toHaveBeenCalledWith(sortedProcesses);
    expect(Display).toHaveBeenCalledWith(sortedProcesses);
    expect(ShowAvgWaitTime).toHaveBeenCalled();
    expect(ShowAvgResponseTime).toHaveBeenCalled();
  });
})
