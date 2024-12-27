import { PriorityQueue } from "./p_queue.js";

const get_spn_processes = (processes) => {
    const priority_processes = new PriorityQueue();
    processes.forEach((process) => {
        priority_processes.enqueue(process, process.duration);
    });
    return priority_processes;
};

const spn = (priority_processes) => {
    while (!priority_processes.isEmpty()) {
        
    }
}