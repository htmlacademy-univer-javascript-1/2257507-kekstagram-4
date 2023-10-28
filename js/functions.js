function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength();

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for(let i=normalizedString.length-1; i>=0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
}

isPalindrome('топот');

function detachNumbers(string) {
  string = string.toString();
  let number='';
  for (let i=0; i<string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += parseInt(string[i], 10);
    }
  }
  return parseInt(number, 10);
}

detachNumbers();
