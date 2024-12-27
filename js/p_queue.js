class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    // Helper method to swap two elements
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    // Add an element to the queue
    enqueue(element, priority) {
      this.heap.push({ element, priority });
      this.bubbleUp();
    }
  
    // Remove and return the highest-priority element
    dequeue() {
      if (this.heap.length === 1) return this.heap.pop();
      const top = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
      return top;
    }
  
    // Move the last element up to restore heap property
    bubbleUp() {
      let index = this.heap.length - 1;
      const element = this.heap[index];
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
        if (element.priority >= parent.priority) break;
        this.swap(index, parentIndex);
        index = parentIndex;
      }
    }
  
    // Move the first element down to restore heap property
    bubbleDown() {
      let index = 0;
      const length = this.heap.length;
      const element = this.heap[index];
  
      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swapIndex = null;
  
        if (leftChildIndex < length) {
          leftChild = this.heap[leftChildIndex];
          if (leftChild.priority < element.priority) {
            swapIndex = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.heap[rightChildIndex];
          if (
            (swapIndex === null && rightChild.priority < element.priority) ||
            (swapIndex !== null && rightChild.priority < leftChild.priority)
          ) {
            swapIndex = rightChildIndex;
          }
        }
  
        if (swapIndex === null) break;
        this.swap(index, swapIndex);
        index = swapIndex;
      }
    }
  
    // Check if the queue is empty
    isEmpty() {
      return this.heap.length === 0;
    }
  }
  
export {PriorityQueue};
