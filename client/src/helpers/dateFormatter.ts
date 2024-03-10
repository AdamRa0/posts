import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInYears } from "date-fns";

export default function dateFormatter(date: Date): string {
    const currentTime: Date = new Date();

    const diffInMinutes = differenceInMinutes(currentTime, date);
    const diffInHours = differenceInHours(currentTime, date);
    const diffInDays = differenceInDays(currentTime, date);
    const diffInMonths = differenceInMonths(currentTime, date);
    const diffInYears = differenceInYears(currentTime, date);

    if (diffInYears >= 1) {
        return diffInYears === 1 ? `${diffInYears} yr ago` : `${diffInYears} yrs ago`;
    }

    if (diffInMonths >= 1) {
        return `${diffInMonths} m ago`;
    }

    if (diffInDays >= 1) {
        return `${diffInDays} d ago`;
    }

    if (diffInHours >= 1) {
        return diffInHours === 1 ? `${diffInHours} hr ago` : `${diffInHours} hrs ago`;
    }

    return diffInMinutes === 1 ? `${diffInMinutes} min ago` : `${diffInMinutes} mins ago`
}