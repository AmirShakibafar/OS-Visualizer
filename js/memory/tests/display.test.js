import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Display, getMemoryAlgorithm } from '../display.js'; 
import { findFirstFit } from '../first_fit.js';
import { findBestFit } from '../best_fit.js';
import { findWorstFit } from '../worst_fit.js';
import { findNextFit } from '../next_fit.js';


vi.mock('../first_fit.js', () => ({
    findFirstFit: vi.fn(),
}));
vi.mock('../next_fit.js', () => ({
    findNextFit: vi.fn(),
}));
vi.mock('../worst_fit.js', () => ({
    findWorstFit: vi.fn(),
}));
vi.mock('../best_fit.js', () => ({
    findBestFit: vi.fn(),
}));

vi.mock('../memory_space.js');
vi.mock('../memory_table.js', () => ({
    tableOne: null,
    tableTwo: null,
}));
vi.mock('../timer.js', () => ({
    timer: null,
    resetTime: vi.fn()
}));
vi.mock('../../helpers/message.js', () => ({
    messageBox: null,
}));


describe('getMemoryAlgorithm', () => {

  it('Test case 1: should return correct function', async () => {
    expect(getMemoryAlgorithm("first_fit")).toBe(findFirstFit)
    expect(getMemoryAlgorithm("next_fit")).toBe(findNextFit)
    expect(getMemoryAlgorithm("best_fit")).toBe(findBestFit)
    expect(getMemoryAlgorithm("worst_fit")).toBe(findWorstFit)
  });
});