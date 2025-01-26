const avgResponseTime = (processes) => {
    let totalResponseTime = 0;
    let completedProcesses = 0;
  
    processes.forEach((process) => {
        if (process.endTime !== undefined) {
            totalResponseTime += (Number(process.endTime) - Number(process.start));
            completedProcesses += 1;
        }
    });

    return completedProcesses > 0 ? (totalResponseTime / completedProcesses): 0;
};

export { avgResponseTime };