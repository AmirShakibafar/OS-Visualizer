const avgWaitTime = (processes) => {
  let totalWaitTime = 0;
  let realNumberOfProcesses = 0;

  processes.forEach((process) => {
    if (process.endTime !== undefined) {
      // Wait time = end time - start time - process duration
      totalWaitTime += (process.endTime - Number(process.start) - Number(process.duration));
      realNumberOfProcesses += 1;
    }
  });
  console.log(realNumberOfProcesses)
  let avg = realNumberOfProcesses === 0 ? 0 : totalWaitTime / realNumberOfProcesses;
  return avg;
}

export { avgWaitTime };
