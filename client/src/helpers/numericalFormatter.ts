export default function formatNumber(number: number): string {
    const value = number / 1000;

    if (number >= 1000) {
        return number < 10000 ? `${value.toFixed(1)}K` : `${Math.floor(value)}K`;
    } else {
        return `${number}`;
    }
}