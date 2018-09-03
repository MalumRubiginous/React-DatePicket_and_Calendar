export function initDate (date) {
    const dateObj = date ? new Date(date) : new Date();
    return {
        raw:  dateObj,
        date: dateObj.getDate(),
        month: dateObj.getMonth(),
        year: dateObj.getFullYear()
    };
};

export function countDays (year, month) {
    // Feb needs to checking leap year
    if (month === 1) {
        // leap year
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    }

    if ((month < 7 && month % 2 === 0) || (month >= 7 && month % 2 === 1)) {
        return 31;
    } else {
        return 30;
    }
};

export function getWeekDay (year, month, date) {
    // Zeller's congruence
    const Y = (month === 0 || month === 1) ? year - 1 : year;
    const y = Y % 100;
    const c = Math.floor(Y / 100);
    const m = ((month + 10) % 12) + 1;
    const w = (date + Math.floor(2.6 * m - 0.2) + y + Math.floor(y / 4) + Math.floor(c / 4) - (2 * c));
    return (w % 7 + 7) % 7;
};

export function isLegalDate (dateString) {
    if (typeof dateString !== 'string') { return false; }

    const regex = /^((?:19|20)[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const result = dateString.match(regex);

    if (!result) { return false; }

    // Test days of month
    const year = parseInt(result[1]);
    const month = parseInt(result[2]) - 1;
    const date = parseInt(result[3]);

    if (countDays(year, month) < date) {
        return false;
    }

    return dateString;
};

export function simpleTimeFormat (dateObj) {
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1,
        date = dateObj.getDate();

    month = month < 10 ? `0${month}` : month;
    date = date < 10 ? `0${date}` : date;

    return `${year}-${month}-${date}`;
};
