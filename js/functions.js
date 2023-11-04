function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('ssss', 10);

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

detachNumbers('2023 year');

function checkMeetingDuration (dayStart, dayEnd, meetingStart, meetingDuration) {
  dayStart = dayStart.split(':');
  dayEnd = dayEnd.split(':');
  meetingStart = meetingStart.split(':');
  const meetingEnd = meetingStart[0]*60 + +meetingStart[1] + meetingDuration;

  if (dayStart[0] > meetingStart[0]) {
    return false;
  }

  return dayEnd[0]*60 + +dayEnd[1] >= meetingEnd;
}

checkMeetingDuration('08:00', '17:30', '14:00', 90);
checkMeetingDuration('8:0', '10:0', '7:0', 120);
checkMeetingDuration('08:00', '14:30', '14:00', 90);
checkMeetingDuration('14:00', '17:30', '08:00', 90);
checkMeetingDuration('08:00', '17:30', '08:00', 900);
