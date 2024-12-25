const FCFS = async (processes) => {
  processes.sort((a, b) => a.start - b.start); // Sort processes by start time
  let curr_tick = 0;
  for (const process of processes) {
    if (isCancelled) {
      return;
    }
    while (process.start > curr_tick) {
      if (isCancelled) {
        return;
      }
      get_next_block({ color: "#fafafa", name: "Idle" }, curr_tick);
      curr_tick++;
      await sleep(300);
    }
    let duration = process.duration;
    while (duration > 0) {
      if (isCancelled) {
        return;
      }
      get_next_block(process, curr_tick);
      duration--;
      curr_tick++;

      await sleep(300);
    }
  }
};

const FCFSArray = (processes) => {
  processes.sort((a, b) => a.start - b.start); // Sort processes by start time
  const fcfs = [];
  let curr_tick = 0;
  for (const process of processes) {
    while (process.start > curr_tick) {
      fcfs.push({ color: "#fafafa", name: "Idle" });
      curr_tick++;
    }
    let duration = process.duration;
    while (duration > 0) {
      fcfs.push(process);
      duration--;
      curr_tick++;
    }
  }
  return fcfs;
};

const ShowFCFS = async (fcfsArray) => {
  while (curr_tick < fcfsArray.length) {
    get_next_block(fcfsArray[curr_tick], curr_tick);
    await sleep(500);
    curr_tick++;
    if (isPaused) {
      break;
    }
  }
};
