import { describe, expect, it } from 'vitest';
import { getRandomInteger, createRandomIdFromRangeGenerator } from '../js/main';

describe('Should return a number within the given range', () => {
  it('when randomFn returns 0', () => {
    expect(getRandomInteger(1, 10, () => 0)).toBe(1);
  });

  it('when randomFn returns a value close to 1', () => {
    expect(getRandomInteger(1, 10, () => 0.999999)).toBe(10);
  });
});

describe('Should generate unique values and return null after the limit is reached', () => {
  it('when called with a positive range', () => {
    const valueGenerator = createRandomIdFromRangeGenerator(1, 5);
    const values = [
      valueGenerator(),
      valueGenerator(),
      valueGenerator(),
      valueGenerator(),
      valueGenerator(),
    ];
    const overflowValue = valueGenerator();

    expect(values.every((num) => num !== null && num <= 5 && num >= 1)).toBe(true);
    expect(new Set(values).size).toBe(values.length);
    expect(overflowValue).toBeNull();
  });

  it('when called with a range that includes negative numbers', () => {
    const valueGenerator = createRandomIdFromRangeGenerator(-2, 2);
    const values = [
      valueGenerator(),
      valueGenerator(),
      valueGenerator(),
      valueGenerator(),
      valueGenerator(),
    ];
    const overflowValue = valueGenerator();

    expect(values.every((num) => num !== null && num <= 2 && num >= -2)).toBe(true);
    expect(new Set(values).size).toBe(values.length);
    expect(overflowValue).toBeNull();
  });
});
