const avgWaitTime = (process) => {
  let totalWaitTime = 0;
  let realNumberOfProcesses = 0;

  process.forEach((process) => {
    if (process.endTime !== undefined) {
      // Wait time = end time - start time - process duration
      totalWaitTime += (process.endTime - Number(process.start) - Number(process.duration));
      realNumberOfProcesses += 1;
    }
  });
  let avg = realNumberOfProcesses === 0 ? 0 : totalWaitTime / realNumberOfProcesses;
  return avg;
}

const ShowAvgWaitTime = (time) => {
  const waitInfo = document.getElementById("average-result-box");
  time = parseFloat(time.toFixed(2));
  waitInfo.textContent = `Average Wait Time: ${time}`;
};

export { avgWaitTime, ShowAvgWaitTime };

