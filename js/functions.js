const checkStringLength = (testString, maxLength) => testString.length <= maxLength;


const isPalindrome = (testString) => {
  const changedString = testString.toLowerCase().replaceAll(/\s/g, '');

  const lastSymbol = changedString.length - 1;

  for (let i = 0; i < changedString.length / 2; i++) {
    return changedString.at(i) === changedString.at(lastSymbol - i);
  }
};

const findNumbers = (string) => {
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

const getPaddedString = (string, minLength, padString) => {
  const actualPad = minLength - string.length;

  if (actualPad <= 0) {
    return string;
  }

  return padString.slice(0, actualPad % padString.length) + padString.repeat(actualPad / padString.length) + string;
};
