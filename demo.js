var dateFormat = require('dateformat');
var day = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
console.log(day);

var date2 = new Date("Fri Jun 01 2018 18:27:05 GMT+0700 (SE Asia Standard Time)");
var day2 = dateFormat(date2, "yyyy-mm-dd HH:MM:ss");
console.log(day2);

console.log(new Intl.DateTimeFormat('en-US').format(date2));
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date2));

console.log('===================');

var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// Results below use the time zone of America/Los_Angeles (UTC-0800, Pacific Standard Time)

// US English uses month-day-year order
console.log(new Intl.DateTimeFormat('en-US').format(date));
// → "12/19/2012"

// British English uses day-month-year order
console.log(new Intl.DateTimeFormat('en-GB').format(date));
// → "19/12/2012"

// Korean uses year-month-day order
console.log(new Intl.DateTimeFormat('ko-KR').format(date));
// → "2012. 12. 19."

// Arabic in most Arabic speaking countries uses real Arabic digits
console.log(new Intl.DateTimeFormat('ar-EG').format(date));
// → "١٩‏/١٢‏/٢٠١٢"

// for Japanese, applications may want to use the Japanese calendar,
// where 2012 was the year 24 of the Heisei era
console.log(new Intl.DateTimeFormat('ja-JP-u-ca-japanese').format(date));
// → "24/12/19"

// when requesting a language that may not be supported, such as
// Balinese, include a fallback language, in this case Indonesian
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
// → "19/12/2012"

console.log('=======================');

var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// request a weekday along with a long date
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(new Intl.DateTimeFormat('de-DE', options).format(date));
// → "Donnerstag, 20. Dezember 2012"

// an application may want to use UTC and make that visible
options.timeZone = 'UTC';
options.timeZoneName = 'short';
console.log(new Intl.DateTimeFormat('en-US', options).format(date));
// → "Thursday, December 20, 2012, GMT"

// sometimes you want to be more precise
options = {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    timeZone: 'Australia/Sydney',
    timeZoneName: 'short'
};
console.log(new Intl.DateTimeFormat('en-AU', options).format(date));
// → "2:00:00 pm AEDT"

// sometimes even the US needs 24-hour time
options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false,
    //timeZone: 'America/Los_Angeles' 
    timeZone: 'Asia/Ho_Chi_Minh'
};
console.log(new Intl.DateTimeFormat('en-US', options).format(date2));

console.log('=================');

function formatDateUS(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() + ", at " + strTime;
}
function formatDateVN(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + 'h' + minutes;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ", lúc " + strTime;
}

console.log(formatDateUS(date2));
console.log(formatDateVN(date2));