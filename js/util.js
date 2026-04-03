/**
 * Функция для генерации случайного положительного числа в указанном диапазоне.
 * @param {number} min
 * @param {number} max
 * @param {() => number} [randomFn=Math.random] Функция, возвращающая число в диапазоне [0, 1).
 * @returns {number}
 */

const getRandomInteger = (min, max, randomFn = Math.random) => Math.floor(randomFn() * (max - min + 1) + min);

/**
 * Создает генератор уникальных случайных чисел.
 * Сохраняет уже использованные значения в массиве usedValues.
 * @param {number} min
 * @param {number} max
 * @returns {NullableGeneratorFunction}
 */

const createRandomIdFromRangeGenerator = (min, max) => {
  const usedValues = [];

  return () => {
    if (usedValues.length >= (max - min + 1)) {
      return null;
    }

    let currentValue = getRandomInteger(min, max);
    while (usedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    usedValues.push(currentValue);

    return currentValue;
  };
};

export {getRandomInteger, createRandomIdFromRangeGenerator};
