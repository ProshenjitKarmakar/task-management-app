import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {differenceInDays, format} from "date-fns";
import {DatesBetween} from "../../interface/calender.interface";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);


export const getOnlyDatesBetween = (startDate: string, endDate: string): string[] => {
    const dates: string[] = []; // Explicitly define the type of the dates array
    let currentDate = dayjs(startDate);
    const finalDate = dayjs(endDate);

    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate)) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}
export const getDatesBetween = (startDate: string, endDate: string): DatesBetween => {
    const dates: DatesBetween = {};
    let currentDate = dayjs(startDate);
    const finalDate = dayjs(endDate);

    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate)) {
        const monthYear = currentDate.format('MMMM, YYYY');
        if (!dates[monthYear]) {
            dates[monthYear] = [];
        }
        dates[monthYear].push({
            date: currentDate.format('DD'),
            day: currentDate.format('ddd'), // Use short day names
        });
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}


export const getFormatFromAndToDate = (startDate: Date, endDate: Date) => {
    const fromDate = format(startDate, "yyyy-MM-dd");
    const toDate = format(endDate, "yyyy-MM-dd");
    const difference = differenceInDays(endDate, startDate);
    const durationType = getDurationType(difference);

    return {fromDate, toDate, difference, durationType};
};

export const getDurationType = (days = 1) => {
    let durationType = "month";
    if (days <= 7) {
        durationType = "week";
    } else if (days <= 30) {
        durationType = "month";
    } else if (days > 30) {
        durationType = "year";
    }

    return durationType;
};

export const getFormatDataPickerDate = (startDate: Date, endDate: Date) => {
    const fromDate = format(startDate, "MMM dd, yyyy");
    const toDate = format(endDate, "MMM dd, yyyy");

    return [fromDate, toDate];
};