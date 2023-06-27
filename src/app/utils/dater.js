export const dater = (date) => {
    //
    const currDate = Date.now();
    const currDateForCodeBelow = new Date(currDate);
    const difference = currDate - date;
    const minutes = difference / 60000;
    //
    const monthNumber = new Date(date).getMonth() + 1;
    let monthName;
    //
    const theMinute = new Date(date).getMinutes();
    const theHour = new Date(date).getHours();
    const theMonth = new Date(date).getMonth();
    const theYear = new Date(date).getFullYear();
    const theDay = new Date(date).getDay();

    // Это возвращаемое данной функции
    let formattedDate;
    //
    switch (monthNumber) {
        case 1:
            monthName = "января";
            break;
        case 2:
            monthName = "февраля";
            break;
        case 3:
            monthName = "марта";
            break;
        case 4:
            monthName = "апреля";
            break;
        case 5:
            monthName = "мая";
            break;
        case 6:
            monthName = "июня";
            break;
        case 7:
            monthName = "июля";
            break;
        case 8:
            monthName = "августа";
            break;
        case 9:
            monthName = "сентябрся";
            break;
        case 10:
            monthName = "октября";
            break;
        case 11:
            monthName = "ноября";
            break;
        case 12:
            monthName = "декабря";
            break;
    }

    //
    if (currDateForCodeBelow.getFullYear() > theYear) {
        formattedDate = `${
            (theDay < 10 ? "0" + theDay : theDay) +
            "." +
            (monthNumber < 10 ? "0" + monthNumber : monthNumber) +
            "." +
            theYear
        }`;
    }
    //
    if (
        currDateForCodeBelow.getFullYear() === theYear &&
        currDateForCodeBelow.getMonth() === theMonth
    ) {
        formattedDate = `${
            (theDay < 10 ? 0 + theDay : theDay) + "" + monthName
        }`;
    }
    //
    if (minutes < 60 * 24) formattedDate = `${theHour + ":" + theMinute}`;
    //
    if (minutes < 30) formattedDate = "30 минут назад";
    //
    if (minutes < 10) formattedDate = "10 минут назад";
    //
    if (minutes < 5) formattedDate = "5 минут назад";
    //
    if (minutes < 1) formattedDate = "1 минуту назад";

    return formattedDate;
};
