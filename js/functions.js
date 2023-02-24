const checkString = (testString, maxLength) => testString.length <= maxLength;

const isPalindrome = (testString) => {
  testString = testString.toLowerCase().replaceAll(' ', '');

  const LAST_SYMBOL = testString.length - 1;
  for (let i = 0; i < testString.length / 2; i++) {
    return testString.at(i) === testString.at(LAST_SYMBOL - i);
  }
};

const findsNumbers = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }

  return parseInt(result, 10);

};

const namesFiles = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};
