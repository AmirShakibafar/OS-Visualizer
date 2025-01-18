const avgWaitTime = (processes) => {
    let totalWaitTime = 0;
    let realNumberOfProcesses = 0
    processes.forEach((process) => {
      if( process.endTime!= undefined){
        totalWaitTime += (process.endTime - Number(process.start) - Number(process.duration)) ;
        realNumberOfProcesses += 1}
    })
    let avg = totalWaitTime / realNumberOfProcesses
    return avg;
  }

export { avgWaitTime };