import { describe, test, it, expect, vi, beforeEach } from "vitest";
import { 
    Display,
    handleIdleState,
    processExecution 
} from "../display"
import { isCancelled, get_next_block, SPEED } from "../animation_table";
import { sleep } from "../../helpers/helpers";

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
    isCancelled: false,
    get_next_block: vi.fn(),
    SPEED: 10
  }));
vi.mock('../../helpers/helpers.js', () => ({
    sleep : vi.fn(()=>Promise.resolve())
  }));


describe('handleIdleState', () => {
    beforeEach(()=>{
        vi.clearAllMocks()
    })
    it('Test case 1: sould send correct value to another functions',async () => {
      let cur_time = 2;
      let res = await handleIdleState(cur_time)
      expect(res).toStrictEqual({curr_tick: 3});
      expect(get_next_block).toBeCalledTimes(1);
      expect(get_next_block).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },2);
      expect(sleep).toHaveBeenCalledWith(SPEED);
    });

    it('Test case 2: sould return if isCancelled is true', async () => {
      isCancelled = true;
      let cur_time = 2;
      let res = await handleIdleState(cur_time)
      expect(res).toStrictEqual({curr_tick: null});
      expect(get_next_block).toBeCalledTimes(0);
    });
})


describe('processExecution', () => {
    beforeEach(()=>{
        vi.clearAllMocks()
        
    })
    it('Test case 1: sould send correct value to another functions',async () => {
      let cur_time = 0;
      isCancelled = false
      let res = await processExecution({ name: "P1", start: 0, duration: 3, endTime: 3 }, cur_time, 3)
      expect(res).toStrictEqual({"curr_tick": 3})
      
      expect(get_next_block).toBeCalledTimes(3);
      // any obj shold have bgcolor and color property in real
      expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 0, duration: 3, endTime: 3 },0);
      expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 0, duration: 3, endTime: 3 },1);
      expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 0, duration: 3, endTime: 3 },2);
      expect(sleep).toHaveBeenCalledWith(SPEED);
    });

    it('Test case 2: sould return if isCancelled is true', async () => {
      isCancelled = true;
      let cur_time = 2;
      let res = await processExecution(cur_time)
      //expect(res).toStrictEqual({curr_tick: null});
      expect(get_next_block).toBeCalledTimes(0);
    });
})




describe('Display', () => {
  beforeEach(()=>{
      vi.clearAllMocks()
  })

  it('Test case 1: sould send correct value to another functions if q = 0',async () => {
    isCancelled = false
    await Display([{ name: "P1", start: 2, duration: 3, endTime: 5 }])
    
    expect(get_next_block).toBeCalledTimes(5);

    // run handleIdleState
    expect(get_next_block).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },0);
    expect(get_next_block).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },1);
    
    // any obj shold have bgcolor and color property in real
    // run processExecution
    expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, endTime: 5 }, 2);
    expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, endTime: 5 }, 3);
    expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, endTime: 5 }, 4);
  });

  it('Test case 2: sould return if isCancelled is true', async () => {
    isCancelled = true;
    await Display([{ name: "P1", start: 2, duration: 3, endTime: 3 }])
    expect(get_next_block).toBeCalledTimes(0);
  });

  it('Test case 3: sould send correct value to another functions if q != 0',async () => {
    isCancelled = false;
    const q = 2;
    await Display([
      { name: "P1", start: 2, duration: 3, remaining: 3 },
      { name: "P1", start: 2, duration: 3, remaining: 1, endTime: 5 }
    ], q)
    
    expect(get_next_block).toBeCalledTimes(5);

    // run handleIdleState
    expect(get_next_block).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },0);
    expect(get_next_block).toHaveBeenCalledWith({ bgcolor: "#fcfcfc", color: "#000", name: "Idle" },1);
    
    // any obj shold have bgcolor and color property in real
    // run processExecution
    expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, remaining: 3 }, 2);
    expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, remaining: 3 }, 3);
    expect(get_next_block).toHaveBeenCalledWith({ name: "P1", start: 2, duration: 3, remaining: 1, endTime: 5 }, 4);
  });
})

