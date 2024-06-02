export default function formatNumber(number: number): string {
    const value = number / 1000;

    return number >= 1000 && number < 10000 ? `${value.toFixed(1)}K` : `${Math.trunc(value)}K`;
}