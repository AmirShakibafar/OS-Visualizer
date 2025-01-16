const avgWaitTime = (processes) => {
    let totalWaitTime = 0;
    processes.forEach((process) => {
      totalWaitTime += (process.endTime - process.start - process.duration) ;
    })
    return totalWaitTime / processes.length;
  }