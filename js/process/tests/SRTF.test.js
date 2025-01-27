import { describe, test, it, expect, vi } from "vitest";
import { SRTF, SRTFProcessSort } from  "../SRTF.js";
import { Display,  } from "../display.js";
import { avgWaitTime, ShowAvgWaitTime } from "../avgWaitTimeCalculator.js"
import { avgResponseTime, ShowAvgResponseTime } from "../avgResponseTimeCalculator.js"


// Disable DOM
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

vi.mock('../quantom_input', () => ({
  quantomInput: 2,
}))






/////////////////////////////     Tests    ////////////////////////////

// All these test ( q = 1 )  maybe user can change it (not now) //

describe('SRTFProcessSort', () => {
    it('Test case 1: Processes with no overlap', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 0, duration: 3 },
          { name: "P2", start: 5, duration: 2 },
          { name: "P3", start: 10, duration: 1 }
        ],1,0)).toStrictEqual([
          { name: "P1", start: 0, duration: 3, remaining: 3 },
          { name: "P1", start: 0, duration: 3, remaining: 2 },
          { name: "P1", start: 0, duration: 3, remaining: 1, endTime: 3 },

          { name: "P2", start: 5, duration: 2, remaining: 2 },
          { name: "P2", start: 5, duration: 2, remaining: 1, endTime: 7 },

          { name: "P3", start: 10, duration: 1, remaining: 1, endTime: 11 }
        ]);
      });
    

      it('Test case 2: Processes with overlapping start times', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 0, duration: 3 },
          { name: "P2", start: 1, duration: 5 },
          { name: "P3", start: 2, duration: 2 }
        ],1,0)).toStrictEqual([
          { name: "P1", start: 0, duration: 3, remaining: 3 },
          { name: "P1", start: 0, duration: 3, remaining: 2 },
          { name: "P1", start: 0, duration: 3, remaining: 1, endTime: 3 },

          { name: "P3", start: 2, duration: 2, remaining: 2 },
          { name: "P3", start: 2, duration: 2, remaining: 1, endTime: 5 },

          { name: "P2", start: 1, duration: 5, remaining: 5 },
          { name: "P2", start: 1, duration: 5, remaining: 4 },
          { name: "P2", start: 1, duration: 5, remaining: 3 },
          { name: "P2", start: 1, duration: 5, remaining: 2 },
          { name: "P2", start: 1, duration: 5, remaining: 1, endTime: 10 },
        ]);
      });
    

      it('Test case 3: Processes starting at the same time', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 0, duration: 4 },
          { name: "P2", start: 0, duration: 2 },
          { name: "P3", start: 0, duration: 3 }
        ],1,0)).toStrictEqual([
          { name: "P2", start: 0, duration: 2, remaining: 2 },
          { name: "P2", start: 0, duration: 2, remaining: 1, endTime: 2 },

          { name: "P3", start: 0, duration: 3, remaining: 3 },
          { name: "P3", start: 0, duration: 3, remaining: 2 },
          { name: "P3", start: 0, duration: 3, remaining: 1, endTime: 5 },

          { name: "P1", start: 0, duration: 4, remaining: 4 },
          { name: "P1", start: 0, duration: 4, remaining: 3 },
          { name: "P1", start: 0, duration: 4, remaining: 2 },
          { name: "P1", start: 0, duration: 4, remaining: 1, endTime: 9},
        ]);
      });
    
    

      it('Test case 4: Processes with mixed start times', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 3, duration: 4 },
          { name: "P2", start: 0, duration: 5 },
          { name: "P3", start: 1, duration: 2 }
        ],1,0)).toStrictEqual([
          { name: "P2", start: 0, duration: 5, remaining: 5 },

          { name: "P3", start: 1, duration: 2, remaining: 2 },
          { name: "P3", start: 1, duration: 2, remaining: 1, endTime: 3 },

          { name: "P2", start: 0, duration: 5, remaining: 4 },
          { name: "P2", start: 0, duration: 5, remaining: 3 },
          { name: "P2", start: 0, duration: 5, remaining: 2 },
          { name: "P2", start: 0, duration: 5, remaining: 1, endTime: 7 },

          { name: "P1", start: 3, duration: 4, remaining: 4 },
          { name: "P1", start: 3, duration: 4, remaining: 3 },
          { name: "P1", start: 3, duration: 4, remaining: 2 },
          { name: "P1", start: 3, duration: 4, remaining: 1, endTime: 11 },
        ]);
      });
    

      it('Test case 5: Single process', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 5, duration: 10 }
        ],1,0)).toStrictEqual([
          { name: "P1", start: 5, duration: 10, remaining: 10 },
          { name: "P1", start: 5, duration: 10, remaining: 9 },
          { name: "P1", start: 5, duration: 10, remaining: 8 },
          { name: "P1", start: 5, duration: 10, remaining: 7 },
          { name: "P1", start: 5, duration: 10, remaining: 6 },
          { name: "P1", start: 5, duration: 10, remaining: 5 },
          { name: "P1", start: 5, duration: 10, remaining: 4 },
          { name: "P1", start: 5, duration: 10, remaining: 3 },
          { name: "P1", start: 5, duration: 10, remaining: 2 },
          { name: "P1", start: 5, duration: 10, remaining: 1, endTime: 15 },
        ]);
      });
    

      it('Test case 6: Processes with identical start and duration times', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 1, duration: 3 },
          { name: "P2", start: 1, duration: 3 },
          { name: "P3", start: 1, duration: 3 }
        ],1,0)).toStrictEqual([
          { name: "P1", start: 1, duration: 3, remaining: 3 },
          { name: "P1", start: 1, duration: 3, remaining: 2 },
          { name: "P1", start: 1, duration: 3, remaining: 1, endTime: 4 },

          { name: "P2", start: 1, duration: 3, remaining: 3 },
          { name: "P2", start: 1, duration: 3, remaining: 2 },
          { name: "P2", start: 1, duration: 3, remaining: 1, endTime: 7 },

          { name: "P3", start: 1, duration: 3, remaining: 3 },
          { name: "P3", start: 1, duration: 3, remaining: 2 },
          { name: "P3", start: 1, duration: 3, remaining: 1, endTime: 10 },
        ]);
      });
    

      it('Test case 7: Processes with zero duration', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 0, duration: 0 },
          { name: "P2", start: 2, duration: 4 },
          { name: "P3", start: 3, duration: 0 }
        ],1,0)).toStrictEqual([
          { name: "P1", start: 0, duration: 0, remaining: 0, endTime: 0 },

          { name: "P2", start: 2, duration: 4, remaining: 4 },

          { name: "P3", start: 3, duration: 0, remaining: 0, endTime: 3 },

          { name: "P2", start: 2, duration: 4, remaining: 3 },
          { name: "P2", start: 2, duration: 4, remaining: 2 },
          { name: "P2", start: 2, duration: 4, remaining: 1, endTime: 6 },
        ]);
      });
    
  
      it('Test case 8: Processes with floating-point durations', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: 0, duration: 2.5 },
          { name: "P2", start: 1, duration: 3.7 },
          { name: "P3", start: 3, duration: 1.2 }
        ],1,0)).toStrictEqual([
          { name: "P1", start: 0, duration: 2.5, remaining: 2.5 },
          { name: "P1", start: 0, duration: 2.5, remaining: 1.5 },
          { name: "P1", start: 0, duration: 2.5, remaining: 0.5, endTime: 2.5 },
          
          { name: "P2", start: 1, duration: 3.7, remaining: 3.7 },

          { name: "P3", start: 3, duration: 1.2, remaining: 1.2 },
          { name: "P3", start: 3, duration: 1.2, remaining: 0.19999999999999996, endTime: 4.7 },

          { name: "P2", start: 1, duration: 3.7, remaining: 2.7 },
          { name: "P2", start: 1, duration: 3.7, remaining: 1.7000000000000002 },
          { name: "P2", start: 1, duration: 3.7, remaining: 0.7000000000000002, endTime: 7.4 },

          
        ]);
      });
 

      it('Test case 9: Processes with negative start times', () => {
        expect(SRTFProcessSort([
          { name: "P1", start: -3, duration: 5 },
          { name: "P2", start: 0, duration: 2 },
          { name: "P3", start: -1, duration: 4 }
        ],1,0)).toStrictEqual([
          { name: "P2", start: 0, duration: 2, remaining: 2 },
          { name: "P2", start: 0, duration: 2, remaining: 1, endTime: 2 },

          { name: "P3", start: -1, duration: 4, remaining: 4 },
          { name: "P3", start: -1, duration: 4, remaining: 3 },
          { name: "P3", start: -1, duration: 4, remaining: 2 },
          { name: "P3", start: -1, duration: 4, remaining: 1, endTime: 6 },

          { name: "P1", start: -3, duration: 5, remaining: 5 },
          { name: "P1", start: -3, duration: 5, remaining: 4 },
          { name: "P1", start: -3, duration: 5, remaining: 3 },
          { name: "P1", start: -3, duration: 5, remaining: 2 },
          { name: "P1", start: -3, duration: 5, remaining: 1, endTime: 11 },
          
        ]);
      });


      it('Test case 10: Large input with 20 processes', () => {
        expect(SRTFProcessSort([
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
        ],1,0)).toStrictEqual([
          { name: "P1", start: 0, duration: 5, remaining: 5 },

          { name: "P4", start: 1, duration: 2, remaining: 2 },
          { name: "P4", start: 1, duration: 2, remaining: 1, endTime: 3 }, 

          { name: "P5", start: 3, duration: 1, remaining: 1, endTime: 4 },

          { name: "P2", start: 2, duration: 3, remaining: 3 },
          { name: "P2", start: 2, duration: 3, remaining: 2 },
          { name: "P2", start: 2, duration: 3, remaining: 1, endTime: 7 },

          { name: "P9", start: 7, duration: 3, remaining:3 },
          { name: "P9", start: 7, duration: 3, remaining:2 },
          { name: "P9", start: 7, duration: 3, remaining:1, endTime: 10 },

          { name: "P10", start: 9, duration: 2, remaining: 2 },
          { name: "P10", start: 9, duration: 2, remaining: 1, endTime: 12 },

          { name: "P12", start: 11, duration: 3, remaining: 3 },
          { name: "P12", start: 11, duration: 3, remaining: 2 },
          { name: "P12", start: 11, duration: 3, remaining: 1, endTime: 15 },

          { name: "P14", start: 13, duration: 2, remaining: 2 },
          { name: "P14", start: 13, duration: 2, remaining: 1, endTime: 17 },

          { name: "P15", start: 14, duration: 3, remaining: 3 },
          { name: "P15", start: 14, duration: 3, remaining: 2 },
          { name: "P15", start: 14, duration: 3, remaining: 1, endTime: 20 },

          { name: "P20", start: 19, duration: 3, remaining: 3 },
          { name: "P20", start: 19, duration: 3, remaining: 2 },
          { name: "P20", start: 19, duration: 3, remaining: 1, endTime: 23 },

          { name: "P1", start: 0, duration: 5, remaining: 4 },
          { name: "P1", start: 0, duration: 5, remaining: 3 },
          { name: "P1", start: 0, duration: 5, remaining: 2 },
          { name: "P1", start: 0, duration: 5, remaining: 1, endTime: 27 },

          { name: "P6", start: 5, duration: 4, remaining: 4 },
          { name: "P6", start: 5, duration: 4, remaining: 3 },
          { name: "P6", start: 5, duration: 4, remaining: 2 },
          { name: "P6", start: 5, duration: 4, remaining: 1, endTime: 31 },

          { name: "P11", start: 10, duration: 4, remaining: 4 },
          { name: "P11", start: 10, duration: 4, remaining: 3 },
          { name: "P11", start: 10, duration: 4, remaining: 2 },
          { name: "P11", start: 10, duration: 4, remaining: 1, endTime: 35 },

          { name: "P18", start: 17, duration: 4, remaining: 4 },
          { name: "P18", start: 17, duration: 4, remaining: 3 },
          { name: "P18", start: 17, duration: 4, remaining: 2 },
          { name: "P18", start: 17, duration: 4, remaining: 1, endTime: 39 },

          { name: "P8", start: 8, duration: 5, remaining: 5 },
          { name: "P8", start: 8, duration: 5, remaining: 4 },
          { name: "P8", start: 8, duration: 5, remaining: 3 },
          { name: "P8", start: 8, duration: 5, remaining: 2 },
          { name: "P8", start: 8, duration: 5, remaining: 1, endTime: 44 },

          { name: "P17", start: 16, duration: 5, remaining: 5 },
          { name: "P17", start: 16, duration: 5, remaining: 4 },
          { name: "P17", start: 16, duration: 5, remaining: 3 },
          { name: "P17", start: 16, duration: 5, remaining: 2 },
          { name: "P17", start: 16, duration: 5, remaining: 1, endTime: 49 },

          { name: "P7", start: 6, duration: 6, remaining: 6 },
          { name: "P7", start: 6, duration: 6, remaining: 5 },
          { name: "P7", start: 6, duration: 6, remaining: 4 },
          { name: "P7", start: 6, duration: 6, remaining: 3 },
          { name: "P7", start: 6, duration: 6, remaining: 2 },
          { name: "P7", start: 6, duration: 6, remaining: 1, endTime: 55 },

          { name: "P13", start: 12, duration: 6, remaining: 6 },
          { name: "P13", start: 12, duration: 6, remaining: 5 },
          { name: "P13", start: 12, duration: 6, remaining: 4 },
          { name: "P13", start: 12, duration: 6, remaining: 3 },
          { name: "P13", start: 12, duration: 6, remaining: 2 },
          { name: "P13", start: 12, duration: 6, remaining: 1, endTime: 61 },

          { name: "P19", start: 18, duration: 6, remaining: 6 },
          { name: "P19", start: 18, duration: 6, remaining: 5 },
          { name: "P19", start: 18, duration: 6, remaining: 4 },
          { name: "P19", start: 18, duration: 6, remaining: 3 },
          { name: "P19", start: 18, duration: 6, remaining: 2 },
          { name: "P19", start: 18, duration: 6, remaining: 1, endTime: 67 },

          { name: "P3", start: 4, duration: 7, remaining: 7 },
          { name: "P3", start: 4, duration: 7, remaining: 6 },
          { name: "P3", start: 4, duration: 7, remaining: 5 },
          { name: "P3", start: 4, duration: 7, remaining: 4 },
          { name: "P3", start: 4, duration: 7, remaining: 3 },
          { name: "P3", start: 4, duration: 7, remaining: 2 },
          { name: "P3", start: 4, duration: 7, remaining: 1, endTime: 74 },

          { name: "P16", start: 15, duration: 7, remaining: 7 },
          { name: "P16", start: 15, duration: 7, remaining: 6 },
          { name: "P16", start: 15, duration: 7, remaining: 5 },
          { name: "P16", start: 15, duration: 7, remaining: 4 },
          { name: "P16", start: 15, duration: 7, remaining: 3 },
          { name: "P16", start: 15, duration: 7, remaining: 2 },
          { name: "P16", start: 15, duration: 7, remaining: 1, endTime: 81 },




        ]);
      });
})


describe('SRTF', () => {
  it('Test case 1: sould send correct value to another functions', async () => {
    const processes = [
      { name: "P1", start: 0, duration: 3 },
      { name: "P2", start: 5, duration: 2 },
      { name: "P3", start: 10, duration: 1 }
    ];
    const sortedProcesses = [
      { name: "P1", start: 0, duration: 3, remaining: 3, endTime: undefined },
      { name: "P1", start: 0, duration: 3, remaining: 2, endTime: undefined },
      { name: "P1", start: 0, duration: 3, remaining: 1, endTime: 3 },
      { name: "P2", start: 5, duration: 2, remaining: 2, endTime: undefined },
      { name: "P2", start: 5, duration: 2, remaining: 1, endTime: 7 },
      { name: "P3", start: 10, duration: 1, remaining: 1, endTime: 11 }
    ];
    const q = 1;

    await SRTF(processes)
    expect(processes.every(p => p.endTime !== undefined)).toBe(true);
    //expect(SRTFProcessSort).toHaveBeenCalledWith(processes);
    expect(avgWaitTime).toHaveBeenCalledWith(sortedProcesses);
    expect(avgResponseTime).toHaveBeenCalledWith(sortedProcesses);
    expect(Display).toHaveBeenCalledWith(sortedProcesses, q);
    expect(ShowAvgWaitTime).toHaveBeenCalled();
    expect(ShowAvgResponseTime).toHaveBeenCalled();
  });
})