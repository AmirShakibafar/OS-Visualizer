Memory Management Policies
==========================

**Memory Policies**  
    *  `First Fit`  
    *  `Next Fit`   
    *  `Best Fit`   
    *  `Worst Fit`   

|


Module Components
-----------------

Each module has two key functions. The module includes the following functions:

1. **find** `Name_Of_Memory_Policies` 

    |   `findFirstFit(processBlock)`
    |   `findNextFit(processBlock)`
    |   `findBestFit(processBlock)`
    |   `findWorstFit(processBlock)`


* The responsibility of finding a suitable location for each process and **storing** it in memory.

2. **execute** `Name_Of_Memory_Policies`

    |   `executeFirstFit();`
    |   `executeNextFit();`
    |   `executeBestFit();`
    |   `executeWorstFit();`


*  The responsibility of calling `Display()` according to the memory management policy.

    |   `Display("best_fit");`

|
|

Memory
------------

**Space : 64 bit**

**Properties Of Each Block Of Memory**

1.  `processName`
2.  `bgColor`
3.  `color`
4.  `blockExitTime`
5.  `isActive`
6.  `isHovered`
7.  `wasRecentlyAdded`
8.  `blockIndex`

**Core Functions**

    |  `getMemorySpaces ()`
    |  `clearMemorySpaces ()`
    |  `allocateMemorySpace (start, processBlock)`
    |  `deAllocateMemorySpace (currTick)`
    |  `updateHoverState (start, size, isHovered)`
    |  `checkIfRangeEmpty (startIndex, blockSize)`
    |  `findRangeOfEmpty (startIndex)`

|
|

Process Block Properties
------------------------


1.    **name**
2.    **blockSize**
3.    **blockArrival**
4.    **blockExitTime**
5.    **blockStartIndex**
6.    **color**
7.    **bgColor**
8.    **isActive**

|
|




Diagram
-----------------------

**First Fit, Next Fit**

.. image:: Diagrams/First_Fit.drawio.svg


|
|

**Best Fit, Worst Fit**

.. image:: Diagrams/Best_Fit.drawio.svg


