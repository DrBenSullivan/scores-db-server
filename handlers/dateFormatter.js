// Define functions to format dates.
exports.currentDateForDatabase = () => {
        const timestamp = Date.now();
        const dateTime = new Date(timestamp);
        const currentDay = dateTime.getDate();
        const currentMonth = ((dateTimeInput) => {
            const month = dateTime.getMonth() + 1;
            return month < 10 ? `0${month}` : `${month}`;
        })(dateTime);
        const currentYear = dateTime.getFullYear();
        return `${currentYear}${currentMonth}${currentDay}`;
};

exports.dateFromDatabase = result => {
    const stringDate = toString(result.date);
    const year = parseInt(substring(0, 3, stringDate));
    const month = parseInt(substring(4, 5, stringDate)) - 1;
    const day = parseInt(substring(6, 7, stringDate));
    return Date(year, month, day);
};