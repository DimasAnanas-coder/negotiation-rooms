export interface UtcInterval {
    from: string;
    to: string;
}

interface CalendarDate {
    year: number;
    month: number;
    day: number;
}

function getOfficeDate(timezone: string, date: Date | null): CalendarDate {
    if (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }

    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    return { year: Number(values.year), month: Number(values.month), day: Number(values.day) };
}

function toUtcIso(date: CalendarDate, minutes: number, timezone: string): string | null {
    const targetUtc = Date.UTC(
        date.year,
        date.month - 1,
        date.day,
        Math.floor(minutes / 60),
        minutes % 60,
    );
    let timestamp = targetUtc;

    for (let attempt = 0; attempt < 4; attempt += 1) {
        const parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23',
        }).formatToParts(new Date(timestamp));
        const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
        const representedUtc = Date.UTC(
            Number(values.year),
            Number(values.month) - 1,
            Number(values.day),
            Number(values.hour),
            Number(values.minute),
            Number(values.second),
        );
        timestamp = targetUtc - (representedUtc - timestamp);
    }

    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(new Date(timestamp));
    const resolved = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    if (
        Number(resolved.year) !== date.year
        || Number(resolved.month) !== date.month
        || Number(resolved.day) !== date.day
        || Number(resolved.hour) !== Math.floor(minutes / 60)
        || Number(resolved.minute) !== minutes % 60
        || Number(resolved.second) !== 0
    ) {
        return null;
    }

    return new Date(timestamp).toISOString();
}

export function getOfficeWorkdayRange(date: Date | null, timezone: string): UtcInterval | null {
    const officeDate = getOfficeDate(timezone, date);
    const from = toUtcIso(officeDate, 9 * 60, timezone);
    const to = toUtcIso(officeDate, 20 * 60, timezone);

    return from && to ? { from, to } : null;
}

export function formatOfficeTime(value: string, timezone: string): string {
    return new Intl.DateTimeFormat('ru-RU', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).format(new Date(value));
}
