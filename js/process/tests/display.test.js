import { describe, it, expect, vi, beforeEach } from "vitest";
import { 
    Display,
    handleIdleState,
    processExecution,
    handleContextSwitch,
    handleCS
} from "../display"
import { sleep } from "../../helpers/helpers";
import { SPEED } from "../../helpers/speed";
import { readIsCancelled } from "../../helpers/cancelFlag";
import { getNextBlock } from "../processAnimationView.js";
import { getContextSwitch } from "../context_switch.js";

vi.mock('../process_table', () => ({
    processTable: null
}));
vi.mock('../manual_add_process', () => ({
    policy: null
}));
vi.mock('../timing_policies', () => ({
    policy: null
}));
vi.mock('../../helpers/helpers.js', () => ({
    sleep : vi.fn(()=>Promise.resolve())
}))
vi.mock('../../helpers/speed.js', () => ({
    SPEED : 1,
}));
vi.mock('../avgWaitTimeCalculator', () => ({
  avgWaitTime: vi.fn(),
  ShowAvgWaitTime: vi.fn(),
}));
vi.mock('../avgResponseTimeCalculator', () => ({
  avgResponseTime: vi.fn(),
  ShowAvgResponseTime: vi.fn(),
}));
vi.mock('../processAnimationView', () => ({
  tableBody: null,
  getNextBlock: vi.fn(),
}))
vi.mock('../context_switch', () => ({
  contextSwitch: 0,
  getContextSwitch: vi.fn(() => {return 0}),
}));
vi.mock('../../helpers/cancelFlag.js', () => ({
  readIsCancelled: vi.fn(),
}));



describe('handleCS', () => {
  beforeEach(()=>{
      vi.clearAllMocks()
        readIsCancelled.mockReturnValue(false);
        getContextSwitch.mockReturnValue(0);

  })
  it('Test case 1: sould send correct value to another functions',async () => {
    readIsCancelled.mockReturnValue(false);
    getContextSwitch.mockReturnValue(2);
    let cur_time = 2;
    let res = await handleCS(cur_time)
    expect(res).toStrictEqual({curr_tick: 4});
    expect(getNextBlock).toBeCalledTimes(2);
    expect(sleep).toHaveBeenCalledWith(SPEED);
  });

  it('Test case 2: sould return if isCancelled is true', async () => {
    readIsCancelled.mockReturnValue(true);

    let cur_time = 2;
    let res = await handleCS(cur_time)
    expect(res).toStrictEqual({curr_tick: null});
    expect(getNextBlock).toBeCalledTimes(0);
  });
})

describe('handleIdleState', () => {
    beforeEach(()=>{
        vi.clearAllMocks()
        readIsCancelled.mockReturnValue(false);
        getContextSwitch.mockReturnValue(0);
    })
    it('Test case 1: sould send correct value to another functions',async () => {
      let cur_time = 2;
      let res = await handleIdleState(cur_time)
      expect(res).toStrictEqual({curr_tick: 3});
      expect(getNextBlock).toBeCalledTimes(1);
      expect(getNextBlock).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },2);
      expect(sleep).toHaveBeenCalledWith(SPEED);
    });

    it('Test case 2: sould return if isCancelled is true', async () => {
      readIsCancelled.mockReturnValue(true);

      let cur_time = 2;
      let res = await handleIdleState(cur_time)
      expect(res).toStrictEqual({curr_tick: null});
      expect(getNextBlock).toBeCalledTimes(0);
    });
})
describe('handleContextSwitch', () => {
    beforeEach(()=>{
        vi.clearAllMocks()
        readIsCancelled.mockReturnValue(false);
        getContextSwitch.mockReturnValue(0);
    })
    it('Test case 1: sould send correct value to another functions',async () => {
      readIsCancelled.mockReturnValue(false);
      let cur_time = 2;
      let res = await handleContextSwitch(cur_time)
      expect(res).toStrictEqual({curr_tick: 3});
      expect(getNextBlock).toBeCalledTimes(1);
      expect(getNextBlock).toHaveBeenCalledWith({ bgcolor: "#000", color: "#fff", name: "CS" },2);
      expect(sleep).toHaveBeenCalledWith(SPEED);
    });

    it('Test case 2: sould return if isCancelled is true', async () => {
      readIsCancelled.mockReturnValue(true);

      let cur_time = 2;
      let res = await handleContextSwitch(cur_time)
      expect(res).toStrictEqual({curr_tick: null});
      expect(getNextBlock).toBeCalledTimes(0);
    });
})


describe('processExecution', () => {
    beforeEach(()=>{
        vi.clearAllMocks()
        readIsCancelled.mockReturnValue(false);
        getContextSwitch.mockReturnValue(0);
        
    })
    it('Test case 1: sould send correct value to another functions',async () => {
      let cur_time = 0;
      readIsCancelled.mockReturnValue(false);
      let res = await processExecution({ name: "P1", start: 0, duration: 3, endTime: 3 }, cur_time, 3)
      expect(res).toStrictEqual({"curr_tick": 3})
      
      expect(getNextBlock).toBeCalledTimes(3);
      // any obj shold have bgcolor and color property in real
      expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 0, duration: 3, endTime: 3 },0);
      expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 0, duration: 3, endTime: 3 },1);
      expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 0, duration: 3, endTime: 3 },2);
      expect(sleep).toHaveBeenCalledWith(SPEED);
    });

    it('Test case 2: sould return if isCancelled is true', async () => {
      readIsCancelled.mockReturnValue(true);
      let cur_time = 2;
      let res = await processExecution(cur_time)
      expect(getNextBlock).toBeCalledTimes(0);
    });
})




describe('Display', () => {
  beforeEach(()=>{
      vi.clearAllMocks()
      readIsCancelled.mockReturnValue(false);
        getContextSwitch.mockReturnValue(0);
  })

  it('Test case 1: sould send correct value to another functions if q = 0',async () => {
    readIsCancelled.mockReturnValue(false);
    await Display([{ name: "P1", start: 2, duration: 3, endTime: 5 }])
    
    expect(getNextBlock).toBeCalledTimes(5);

    // run handleIdleState
    expect(getNextBlock).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },0);
    expect(getNextBlock).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },1);
    
    // any obj shold have bgcolor and color property in real
    // run processExecution
    expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, endTime: 5 }, 2);
    expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, endTime: 5 }, 3);
    expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, endTime: 5 }, 4);
  });

  it('Test case 2: sould return if isCancelled is true', async () => {
    readIsCancelled.mockReturnValue(true);
    await Display([{ name: "P1", start: 2, duration: 3, endTime: 3 }])
    expect(getNextBlock).toBeCalledTimes(0);
  });

  it('Test case 3: sould send correct value to another functions if q != 0',async () => {
    readIsCancelled.mockReturnValue(false);
    const q = 2;
    await Display([
      { name: "P1", start: 2, duration: 3, remaining: 3 },
      { name: "P1", start: 2, duration: 3, remaining: 1, endTime: 5 }
    ], q)
    
    expect(getNextBlock).toBeCalledTimes(5);

    // run handleIdleState
    expect(getNextBlock).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },0);
    expect(getNextBlock).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },1);
    
    // any obj shold have bgcolor and color property in real
    // run processExecution
    expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, remaining: 3 }, 2);
    expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, remaining: 3 }, 3);
    expect(getNextBlock).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, remaining: 1, endTime: 5 }, 4);
  });
})

