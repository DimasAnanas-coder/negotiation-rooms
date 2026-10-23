export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const MAX_DAYS_AHEAD = 30;

export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function capitalizeFirstLetter(value: string): string {
    return value.replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase('ru-RU'));
}

export function formatSelectedDate(date: Date): string {
    const datePart = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    }).format(date).replace(/\p{L}/u, (letter) => letter.toLocaleUpperCase('ru-RU'));
    const weekday = capitalizeFirstLetter(new Intl.DateTimeFormat('ru-RU', {
        weekday: 'short',
    }).format(date));

    return `${datePart}, ${weekday}`;
}

export function formatMonth(date: Date): string {
    return capitalizeFirstLetter(new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
        year: 'numeric',
    }).format(date));
}

export function formatDayLabel(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(date);
}

export function getMonthDays(month: Date): Date[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const cellCount = Math.ceil((leadingDays + daysInMonth) / 7) * 7;

    return Array.from(
        { length: cellCount },
        (_, index) => new Date(year, monthIndex, index - leadingDays + 1),
    );
}

export function isSameDay(first: Date, second: Date): boolean {
    return first.getFullYear() === second.getFullYear()
        && first.getMonth() === second.getMonth()
        && first.getDate() === second.getDate();
}
