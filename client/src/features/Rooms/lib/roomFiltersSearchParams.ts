import type { RoomFilterValues } from '../types';

function parseDate(value: string | null): Date | null {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() !== year
        || date.getMonth() !== month - 1
        || date.getDate() !== day
    ) {
        return null;
    }

    return date;
}

function parseStartTime(value: string | null): string {
    const digits = value?.replace(':', '') ?? '';
    if (!/^\d{0,4}$/.test(digits)) return '';
    if (digits.length >= 2 && Number(digits.slice(0, 2)) > 23) return '';
    if (digits.length === 4 && Number(digits.slice(2, 4)) > 59) return '';

    return digits;
}

export function parseRoomFilters(searchParams: URLSearchParams): RoomFilterValues {
    const rawDuration = Number(searchParams.get('durationMinutes'));
    const durationMinutes = [15, 30, 45, 60, 75, 90, 105, 120].includes(rawDuration)
        ? rawDuration
        : null;
    const rawCapacity = Number(searchParams.get('minCapacity'));
    const minCapacity = Number.isSafeInteger(rawCapacity) && rawCapacity > 0
        ? rawCapacity
        : null;

    return {
        date: parseDate(searchParams.get('date')),
        startTime: parseStartTime(searchParams.get('startTime')),
        durationMinutes,
        minCapacity,
    };
}

export function updateRoomFilterSearchParams(
    searchParams: URLSearchParams,
    filters: RoomFilterValues,
): URLSearchParams {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('date');
    nextParams.delete('startTime');
    nextParams.delete('durationMinutes');
    nextParams.delete('minCapacity');

    if (filters.date) {
        const year = filters.date.getFullYear();
        const month = String(filters.date.getMonth() + 1).padStart(2, '0');
        const day = String(filters.date.getDate()).padStart(2, '0');
        nextParams.set('date', `${year}-${month}-${day}`);
    }
    if (filters.startTime.length > 0) {
        const value = filters.startTime.length === 4
            ? `${filters.startTime.slice(0, 2)}:${filters.startTime.slice(2)}`
            : filters.startTime;
        nextParams.set('startTime', value);
    }
    if (filters.durationMinutes !== null) {
        nextParams.set('durationMinutes', String(filters.durationMinutes));
    }
    if (filters.minCapacity !== null) {
        nextParams.set('minCapacity', String(filters.minCapacity));
    }

    return nextParams;
}
