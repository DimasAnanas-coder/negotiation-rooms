import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getBookingRequestError, validateBooking } from './bookingValidation';

const validValues = {
    title: 'Планирование',
    date: '2026-11-05',
    time: '10:00',
    duration: 60,
    comment: '',
};
describe('bookingValidation', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-11-01T00:00:00.000Z'));
    });

    afterEach(() => vi.useRealTimers());

    it('проверяет тему и возвращает интервал для корректных значений', () => {
        const result = validateBooking(validValues, 'Europe/Moscow');
        expect(result.valid).toBe(true);
        if (result.valid) {
            expect(result.data).toEqual({ from: '2026-11-05T07:00:00.000Z', to: '2026-11-05T08:00:00.000Z' });
        }
    });

    it('не принимает пустую тему и слишком длинный комментарий', () => {
        const result = validateBooking({ ...validValues, title: '  ', comment: 'x'.repeat(2001) }, 'Europe/Moscow');
        expect(result).toEqual({
            valid: false,
            fieldErrors: { title: 'Обязательное поле', comment: 'Не более 2000 символов' },
        });
    });

    it('показывает конфликт бронирования у поля времени', () => {
        const error = new axios.AxiosError('Conflict', undefined, undefined, undefined, {
            status: 409,
            statusText: 'Conflict',
            headers: {},
            config: { headers: new axios.AxiosHeaders() },
            data: {},
        });

        expect(getBookingRequestError(error).fieldErrors.time)
            .toBe('Это время уже занято. Выберите другое время встречи.');
    });

    it('возвращает понятное сообщение для обычной сетевой ошибки', () => {
        expect(getBookingRequestError(new Error('Network error'))).toEqual({
            fieldErrors: {},
            error: 'Не удалось создать бронирование. Попробуйте ещё раз.',
        });
    });
});
