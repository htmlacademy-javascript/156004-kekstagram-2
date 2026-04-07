/**
 * Функция для проверки длины строки.
 * @param {string} string - Передаваемая строка.
 * @param {number} length - Максимальная длина строки.
 * @returns {boolean} - Если длина строки меньше или равна параметру "length", вернуть "true", иначе "false".
 */

const checkLengthString = (string, length) => string.length <= length;

/**
 * Функция для проверки на палиндромность - последовательность символов одинакова, при чтении, и справа налево и слева направо.
 * Регистр не учитывается.
 * @param {string | number} string - Передаваемая строка.
 * @returns {boolean}
 */

const checkPalindrome = (string) => {
  let clean = string;

  if (typeof string === 'string') {
    clean = string.replaceAll(' ', '').toLowerCase();
  }

  const HALF_LENGTH = Math.floor(clean.length / 2);

  for (let i = 0; i < HALF_LENGTH; i ++) {
    if (clean[i] !== clean[clean.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

/**
 * Функцию для извлечения из строки цифр от 0 до 9.
 * Результат вернуть одним, целым, положительным числом. Если в строке нет цифр - вернуть NaN.
 * @param {string | number} string - Передаваемая строка.
 * @returns {number}
 */

const extractNumbers = (string) => {
  const str = String(string);
  let number = '';

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i], 10))) {
      number += str[i].toString();
    }
  }

  return parseInt(number, 10);
};

/**
 * Функция проверяет, что переданное время встречи попадает в промежуток рабочего дня.
 * @param {string} workStart
 * @param {string} workEnd
 * @param {string} meetingStart
 * @param {number} meetingDuration
 * @returns {boolean}
 */

const checkTime = (workStart, workEnd, meetingStart, meetingDuration) => {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes;
};

export {checkLengthString, checkPalindrome, extractNumbers, checkTime};
