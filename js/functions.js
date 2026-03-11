/*
I. Функция для проверки длины строки.
  Если длина строки меньше или равна второму параметру "length", то вернуть "true", иначе "false".
  Принимает аргументы:
    1. Строка - "string".
    2. Максимальная длина - "length".
*/

const checkLengthString = (string, length) => string.length <= length;

/*
II. Функция для проверки на палиндромность.
  Если последовательность символов одинакова, при чтении, и справа налево и слева направо, то вернуть true, иначе false.
  Регистр не учитывается.
  Принимает аргумент "строку" - "string".
*/

const checkPalindrome = (string) => {
  const clean = string.replaceAll(' ', '').toLowerCase(); // Нормализуем строку
  let reverse = '';
  for (let i = 1; i <= clean.length; i += 1) {
    reverse += clean.at(-i);
  }
  return reverse === clean;
};

// Альтернативный метод
// Последовательно проверяем совпадение символов сначала и с конца. И если находим несовпадение, то завершаем цикл и возвращаем false

const checkPalindromeAlt = (string) => {
  const clean = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < Math.floor(clean.length / 2); i ++) {
    if (clean[i] !== clean[clean.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

/*
Альтернативный метод - третий вариант
  .split('') - разбивает строку на массив символов.
  .reverse() - переворачивает порядок элементов массива.
  .join('') - объединяет элементы массива в строку.
*/

const checkPalindromeAlt2 = (string) => {
  const clean = string.replaceAll(' ', '').toLowerCase();
  return clean === clean.split('').reverse().join('');
};

/*
III. Функцию для извлечения цифр из строки.
  Все цифры вернуть одним, целым, положительным числом.
    1. Если в строке нет цифр - вернуть NaN.
    2. Если число отрицательное - вернуть положительное число.
    3. Если число дробное - вернуть целое число.
  Принимает аргумент "строку" - "string".
*/

const extractNumbers = (string) => {
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      number += string[i].toString();
    }
  }
  return parseInt(number, 10);
};

// Альтернативный метод
// Регулярное выражение /\D/g заменяет ВСЕ не цифры на пустую строку. /g - глобальный флаг

const extractNumbersAlt = (string) =>
  parseInt(string.replace(/\D/g, ''), 10);
