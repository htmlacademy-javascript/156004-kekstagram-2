import {describe, expect, it} from 'vitest';
import {checkLengthString, checkPalindrome, extractNumbers, checkTime} from '../js/functions';

describe('Should the checkLengthString function check the maximum length correctly', () => {
  it('when it receives one symbol', () => {
    expect(checkLengthString('a', 0)).toBe(false);
    expect(checkLengthString('a', 1)).toBe(true);
  });

  it('when it receives multiple symbols', () => {
    expect(checkLengthString('Проверяемая строка', 20)).toBe(true);
    expect(checkLengthString('Проверяемая строка', 10)).toBe(false);
    expect(checkLengthString('多个字符', 10)).toBe(true);
    expect(checkLengthString('多个字符', 1)).toBe(false);
  });

  it('when it boundary cases', () => {
    expect(checkLengthString('', 0)).toBe(true);
    expect(checkLengthString('', 1)).toBe(true);
    expect(checkLengthString('     ', 0)).toBe(false);
    expect(checkLengthString('     ', 10)).toBe(true);
  });
});

describe('Should the checkPalindrome function for checking for palindrome', () => {
  it('when it receives one symbol', () => {
    expect(checkPalindrome('A')).toBe(true);
    expect(checkPalindrome('符')).toBe(true);
  });

  it('when it receives multiple symbols', () => {
    expect(checkPalindrome('топот')).toBe(true);
    expect(checkPalindrome('ДовОд')).toBe(true);
    expect(checkPalindrome('Кекс')).toBe(false);
    expect(checkPalindrome('Лёша на полке клопа нашёл ')).toBe(true);
    expect(checkPalindrome(121)).toBe(true);
    expect(checkPalindrome(1122)).toBe(true);
    expect(checkPalindrome(-1.122)).toBe(true);
  });

  it('when it boundary cases', () => {
    expect(checkPalindrome('')).toBe(true);
    expect(checkPalindrome('     ')).toBe(true);
    // English a and russian a
    expect(checkPalindrome('aа')).toBe(false);
  });
});

describe('Should the extractNumbers function for extracting numbers from 0 to 9', () => {
  it('when it receives only number in string', () => {
    expect(extractNumbers('100')).toBe(100);
    expect(extractNumbers('-100')).toBe(100);
    expect(extractNumbers('001')).toBe(1);
    expect(extractNumbers('1.00')).toBe(100);
    expect(extractNumbers('.10')).toBe(10);
    expect(extractNumbers('20 26')).toBe(2026);
    expect(extractNumbers('0000')).toBe(0);

  });

  it('when it receives number as argument', () => {
    expect(extractNumbers(0)).toBe(0);
    expect(extractNumbers(1)).toBe(1);
    expect(extractNumbers(2026)).toBe(2026);
    expect(extractNumbers(-2026)).toBe(2026);
    expect(extractNumbers(1.10)).toBe(11);
    expect(extractNumbers(0.10)).toBe(1);
  });

  it('when it receives string without numbers', () => {
    expect(extractNumbers('год')).toBeNaN();
    expect(extractNumbers('ECMAScript ')).toBeNaN();
    expect(extractNumbers('多个字符')).toBeNaN();
    expect(extractNumbers('а я томат')).toBeNaN();
  });

  it('when it receives numbers and characters in string', () => {
    expect(extractNumbers('2023 год')).toBe(2023);
    expect(extractNumbers('ECMAScript 2022')).toBe(2022);
    expect(extractNumbers('   1 кефир, 0.5 多个字符   ')).toBe(105);
    expect(extractNumbers('агент 007')).toBe(7);
  });

  it('when it boundary cases', () => {
    expect(extractNumbers('')).toBe(NaN);
    expect(extractNumbers('     ')).toBe(NaN);
  });
});

describe ('Should check if a meeting fits within working hours', () => {
  it('when the meeting is within working hours', () => {
    expect(checkTime('08:00', '17:30', '14:00', 90)).toBe(true);
    expect(checkTime('8:0', '10:0', '8:0', 120)).toBe(true);
  });

  it('when the meeting is outside working hours', () => {
    expect(checkTime('08:00', '14:30', '14:00', 90)).toBe(false);
    expect(checkTime('14:00', '17:30', '08:0', 90)).toBe(false);
    expect(checkTime('8:00', '17:30', '08:00', 900)).toBe(false);
  });
});
