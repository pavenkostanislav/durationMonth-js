"use strict"

function durationMonth(from, until = new Date()) {
	const nowMonth = until.getMonth() + 1;
	const nowDay = until.getDate();
	const nowYear = until.getFullYear();

	const currentYear = from.getFullYear();
	const currentMonth = from.getMonth() + 1;
	const currentDay = from.getDate() + ((currentMonth === 2 && leapYear(currentYear) && !leapYear(nowYear)) ? -1 : 0);
	function leapYear(year) {
		return new Date(year, 1, 29).getDate() === 29;
	}

	function dayInMonth(m, year) {
		m = parseInt(m);
		if (m === 2) return leapYear(year) ? 29 : 28;
		if ([4, 6, 9, 11].indexOf(m) !== -1) return 30;
		return 31;
	}

	const yearDuration = nowYear - currentYear;
	const monthDuration = 12 - parseInt(currentMonth) + parseInt(nowMonth);
	const _dayInMonth = dayInMonth(currentMonth, currentYear);
	const dayDuration = _dayInMonth - parseInt(currentDay) + parseInt(nowDay);
	const realMonth = monthDuration - (dayDuration >= _dayInMonth ? 0 : 1) - (yearDuration >= 1 ? 0 : 12);

	if (yearDuration > 1 || realMonth >= 12) {
		return (yearDuration + (realMonth >= 12 ? 0 : -1)) * 12;
	}

	return realMonth;
}



//tests

function logTest(ex, n, activityDurationData, last = new Date()) {

	if (!!activityDurationData && !!activityDurationData.match(/\d{2}\/\d{2}\/\d{4}/)) {
		const currentYear = activityDurationData.substr(6, 4);
		const currentMonth = activityDurationData.substr(3, 2);
		const currentDay = activityDurationData.substr(0, 2);
		const current = new Date(currentYear, currentMonth - 1, currentDay)

		if (durationMonth(current, last) - n !== 0) {
			console.log(ex + ') ' + durationMonth(current, last), n);
		}
	} else {
		console.log('Something went wrong...');
	}
}

console.log('Starting...');
console.log('If you see any result next the algorithm is failed');
logTest(1, "12", "20/09/2018");
logTest(2, "11", "28/09/2018");
logTest(3, "480", "14/08/1979");
logTest(4, "480", "01/09/1979");
logTest(5, "468", "14/11/1979");
logTest(6, "96", "14/12/2010");
logTest(7, "10", "25/11/2018");
logTest(8, "9", "25/12/2018");
logTest(9, "8", "20/01/2019");
logTest(10, "7", "20/02/2019");
logTest(11, "6", "20/03/2019");
logTest(12, "5", "20/04/2019");
logTest(13, "4", "20/05/2019");
logTest(14, "3", "20/06/2019");
logTest(15, "2", "20/07/2019");
logTest(16, "1", "20/08/2019");
logTest(17, "0", "14/09/2019");
logTest(18, "12", "25/09/2018");
logTest(18, "12", "25/09/2018");
logTest(19, "12", "25/09/2018");
logTest(20, "1", "30/09/2018", new Date(2018, 9, 31));
logTest(21, "27276", "30/09/2013", new Date(4286, 9, 31));
logTest(22, "48", "29/02/2016", new Date(2020, 2, 1));
logTest(23, "36", "29/02/2016", new Date(2019, 2, 1));
logTest(24, "36", "29/02/2016", new Date(2019, 1, 28));
logTest(25, "24", "28/02/2017", new Date(2019, 1, 28));
logTest(26, "2", "30/01/2017", new Date(2017, 2, 31));
logTest(27, "48", "28/02/2016", new Date(2020, 1, 29));
logTest(27, "48", "29/02/2016", new Date(2020, 1, 29));
logTest(27, "36", "29/02/2016", new Date(2020, 1, 28));
console.log('The end');