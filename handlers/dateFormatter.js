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
