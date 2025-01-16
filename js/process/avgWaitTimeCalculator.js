const avgWaitTime = (processes) => {
    let totalWaitTime = 0;
    processes.forEach((process) => {
      totalWaitTime += (process.endTime - process.start - process.duration) ;
    })
    let avg = totalWaitTime / processes.length
    return avg;
  }

export { avgWaitTime };