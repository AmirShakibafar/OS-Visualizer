Scheduling Policies
======================

**Process Scheduling Policies**  
    *  `FCFS (First Come, First Served)`  
    *  `SPN (Shortest Process Next)`  
    *  `SRTF (Shortest Remaining Time First)`  
    *  `RR (Round Robin)`  
    *  `HRRN (Highest Response Ratio Next)`   


|
|

Module Components
-----------------

Each module has two key functions. The module includes the following functions:

1. `Name_Of_Scheduling_Policies` **ProcessSort**

    |   `FCFSProcessSort(processes, CS)`
    |   `SPNProcessSort(processes, CS)`
    |   `SRTFProcessSort(processes, q, CS)` 
    |   `RRProcessSort(processes, q, CS)` 
    |   `HRRNProcessSort(processes, CS)` 

* The responsibility of organizing and prioritizing processes based on the scheduling policy rules.

2. `Name_Of_Scheduling_Policies`

    |   `FCFS (processes);`
    |   `SPN (processes);`
    |   `SRTF (processes);` 
    |   `RR (processes);` 
    |   `HRRN (processes);`

*  A higher-level function that sorts the processes, calculates their average waiting time, etc, and displays the results using helper functions:

    |   `Display(processes, q=0);` 
    |   `ShowAvgWaitTime(AvgWaitTime);`
    |   `ShowAvgResponseTime(AvgResponseTime);`
    |   `avgWaitTime(processes);` 
    |   `avgResponseTime(processes);`
    |   `getContextSwitch();`

|
|

Processes Properties
--------------------


**processes (list)** `: A list of process objects with the following key properties:`

1.  **name** `: The name of the process.`
2.  **start** `: The start time of the process.`
3.  **duration** `: The duration of the process.`
4.  **bgcolor** `: The Background color of the process for isplay` 
5.  **color** `: The color of the process`

**Note**: When  ProcessSort functions are executed, two properties may be added:

6. **endTime** `:The end time of the process`
7. **remaining** `:The remaining time of the process`

|
|

Process Sort Documentation
--------------------------

1.  **FCFSProcessSort**


        `FCFSProcessSort(processes, CS)`

    The **FCFS (First-Come, First-Served)** scheduling policy processes tasks in the order they **arrive**. The first process to enter the queue is the first to be executed, regardless of its duration.

    **Example:**

    
        **Input:**
              | // q=0, CS=0 
              | [
              | { name: "P1", start: 0, duration: 3 },
              | { name: "P2", start: 5, duration: 2 },
              | { name: "P3", start: 10, duration: 1 },
              | ]     
        **Output:**
              | [
              | { name: "P1", start: 0, duration: 3, endTime: 3 },
              | { name: "P2", start: 5, duration: 2, endTime: 7 },
              | { name: "P3", start: 10, duration: 1, endTime: 11 }
              | ]

|

--------------------------------------------------------------------------

2.  **SPNProcessSort**


        `SPNProcessSort(processes, CS)`

    The **SPN (Shortest Process Next)** scheduling policy prioritizes processes based on the **shortest execution time** at current time. The process with the shortest processing time is executed first.

    **Example:**

    
        **Input:**
              | // q=0, CS=0 
              | [
              | { name: "P1", start: 0, duration: 3 },
              | { name: "P2", start: 1, duration: 5 },
              | { name: "P3", start: 2, duration: 2 }
              | ]     
        **Output:**
              | [
              | { name: "P1", start: 0, duration: 3, endTime: 3 },
              | { name: "P3", start: 2, duration: 2, endTime: 5 },
              | { name: "P2", start: 1, duration: 5, endTime: 10 }
              | ]

|

---------------------------------------------------------------

3.  **HRRNProcessSort**


        `HRRNProcessSort(processes, CS)`

    The **HRRN (Highest Response Ratio Next)** scheduling policy selects the process with the **highest response ratio** to execute next. The response ratio is calculated as:
    
    * **Response Ratio** = `(Waiting Time + Service Time) / Service Time`


    **Example:**

    
        **Input:**
              | // q=0, CS=0 
              | [
              | { name: "P1", start: 0, duration: 3 },
              | { name: "P2", start: 1, duration: 5 },
              | { name: "P3", start: 2, duration: 2 }
              | ]     
        **Output:**
              | [
              | { name: "P1", start: 0, duration: 3, endTime: 3 },
              | { name: "P3", start: 2, duration: 2, endTime: 5 },
              | { name: "P2", start: 1, duration: 5, endTime: 10 }
              | ]

|

---------------------------------------------------------------

4.  **RRProcessSort**


        `RRProcessSort(processes, q, CS)`

    The **RR (Round Robin)** scheduling policy allocates a **fixed time slice**, called a quantum, to each process in the queue. Processes are executed in a **cyclic order**, and if a process doesn't complete within its time slice, it is **moved to the back of the queue**.

    **Example:**
        
    
        **Input:**
              | // q=2, CS=0 
              | [
              | { name: "P1", start: 0, duration: 3 },
              | { name: "P2", start: 1, duration: 5 },
              | { name: "P3", start: 2, duration: 2 }
              | ]     
        **Output:**
              | [
              | { name: "P1", start: 0, duration: 3, remaining: 3 },
              |
              | { name: "P2", start: 1, duration: 5, remaining: 5 },
              | { name: "P3", start: 2, duration: 2, remaining: 2, endTime: 6 },
              | { name: "P1", start: 0, duration: 3, remaining: 1, endTime: 7 },
              | 
              | { name: "P2", start: 1, duration: 5, remaining: 3 },
              | { name: "P2", start: 1, duration: 5, remaining: 1, endTime: 10 },
              | ]

|

---------------------------------------------------------------

5.  **SRTFProcessSort**


        `SRTFProcessSort(processes, q, CS)`

    The **SRTF (Shortest Remaining Time First)** scheduling policy selects the process with the **shortest remaining execution time** to execute next. If a new process arrives with a shorter remaining time than the currently running process, the current process is preempted, and the new process is executed.
    
    **Example:**

    
        **Input:**
              | // q=1, CS=0 
              | [
              | { name: "P1", start: 3, duration: 4 },
              | { name: "P2", start: 0, duration: 5 },
              | { name: "P3", start: 1, duration: 2 }}
              | ]     
        **Output:**
              | [
              | { name: "P2", start: 0, duration: 5, remaining: 5 },
              |
              | /* arrive process with a shorter remaining time than the currently running process*/
              |
              | { name: "P3", start: 1, duration: 2, remaining: 2 },
              | { name: "P3", start: 1, duration: 2, remaining: 1, endTime: 3 },
              | 
              | { name: "P2", start: 0, duration: 5, remaining: 4 },
              | { name: "P2", start: 0, duration: 5, remaining: 3 },
              | { name: "P2", start: 0, duration: 5, remaining: 2 },
              | { name: "P2", start: 0, duration: 5, remaining: 1, endTime: 7 },
              | 
              | { name: "P1", start: 3, duration: 4, remaining: 4 },
              | { name: "P1", start: 3, duration: 4, remaining: 3 },
              | { name: "P1", start: 3, duration: 4, remaining: 2 },
              | { name: "P1", start: 3, duration: 4, remaining: 1, endTime: 11 },
              | ]

|

Diagram
-----------------------

**FCFS, SPN, HRRN structures of modules are the same :**

.. image:: Diagrams/FCFS.drawio.svg


|
|

**RR**

.. image:: Diagrams/RR.drawio.svg

|
|

**SRTF**

.. image:: Diagrams/SRTF.drawio.svg
