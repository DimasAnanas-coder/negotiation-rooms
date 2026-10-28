import { describe, expect, it } from 'vitest';
import { BookingIntervalError, formatOfficeTime, getOfficeBookingInterval, getOfficeWorkdayRange } from './officeTime';

describe('officeTime', () => {
    it('переводит время офиса в UTC интервал и обратно', () => {
        const interval = getOfficeBookingInterval('2026-11-05', '10:00', 60, 'Europe/Moscow', Date.parse('2026-11-01T00:00:00Z'));

        expect(interval).toEqual({ from: '2026-11-05T07:00:00.000Z', to: '2026-11-05T08:00:00.000Z' });
        expect(formatOfficeTime(interval.from, 'Europe/Moscow')).toBe('10:00');
    });

    it('возвращает рабочий интервал офиса с 09:00 до 20:00', () => {
        expect(getOfficeWorkdayRange(new Date(2026, 10, 5), 'Europe/Moscow')).toEqual({
            from: '2026-11-05T06:00:00.000Z',
            to: '2026-11-05T17:00:00.000Z',
        });
    });

    it.each([
        ['08:45', 60, 'time'],
        ['19:45', 30, 'duration'],
        ['10:10', 30, 'time'],
    ] as const)('отклоняет неподходящее время %s и длительность %s', (time, duration, field) => {
        try {
            getOfficeBookingInterval('2026-11-05', time, duration, 'Europe/Moscow', Date.parse('2026-11-01T00:00:00Z'));
            throw new Error('Ожидалась ошибка интервала');
        }
        catch (error) {
            expect(error).toBeInstanceOf(BookingIntervalError);
            expect((error as BookingIntervalError).field).toBe(field);
        }
    });

    it('отклоняет дату в прошлом', () => {
        expect(() => getOfficeBookingInterval(
            '2026-11-04', '10:00', 60, 'Europe/Moscow', Date.parse('2026-11-05T00:00:00Z'),
        )).toThrow('Нельзя создать бронирование в прошлом');
    });
});
