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

export class BookingIntervalError extends Error {
    field: 'date' | 'time' | 'duration';

    constructor(message: string, field: 'date' | 'time' | 'duration') {
        super(message);
        this.field = field;
    }
}

export function getOfficeBookingInterval(
    date: string,
    time: string,
    duration: number,
    timezone: string,
    now = Date.now(),
): UtcInterval {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new BookingIntervalError('Укажите дату встречи', 'date');
    if (!/^\d{2}:\d{2}$/.test(time)) throw new BookingIntervalError('Укажите время начала', 'time');
    const [year, month, day] = date.split('-').map(Number);
    const calendar = new Date(Date.UTC(year, month - 1, day));
    if (calendar.toISOString().slice(0, 10) !== date) throw new BookingIntervalError('Укажите корректную дату', 'date');
    const [hour, minute] = time.split(':').map(Number);
    const startMinutes = hour * 60 + minute;
    if (minute > 59 || minute % 15 !== 0) {
        throw new BookingIntervalError('Выберите время с шагом 15 минут', 'time');
    }
    if (!Number.isInteger(duration) || duration < 15 || duration % 15 !== 0) {
        throw new BookingIntervalError('Минимум 15 минут, шаг — 15 минут', 'duration');
    }
    if (startMinutes < 540 || startMinutes >= 1200) {
        throw new BookingIntervalError('Выберите время с 09:00 до 19:45', 'time');
    }
    if (startMinutes + duration > 1200) {
        throw new BookingIntervalError('Встреча должна закончиться не позже 20:00', 'duration');
    }
    const from = toUtcIso({ year, month, day }, startMinutes, timezone);
    const to = toUtcIso({ year, month, day }, startMinutes + duration, timezone);

    if (!from || !to) throw new BookingIntervalError('Укажите корректное время', 'time');
    if (Date.parse(from) <= now) {
        const isPastDate = date < new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(now));
        throw new BookingIntervalError('Нельзя создать бронирование в прошлом', isPastDate ? 'date' : 'time');
    }
    if (Date.parse(from) - now > 30 * 86400_000) throw new BookingIntervalError('Выберите дату не более чем на 30 дней вперёд', 'date');
    return { from, to };
}
