import { describe, expect, it } from 'vitest';
import { parseRoomFilters, updateRoomFilterSearchParams } from './roomFiltersSearchParams';

describe('roomFiltersSearchParams', () => {
    it('читает корректные фильтры из адреса', () => {
        const filters = parseRoomFilters(new URLSearchParams(
            'date=2026-11-05&startTime=10%3A15&durationMinutes=60&minCapacity=8',
        ));

        expect(filters).toEqual({
            date: new Date(2026, 10, 5),
            startTime: '1015',
            durationMinutes: 60,
            minCapacity: 8,
        });
    });

    it('игнорирует некорректные значения', () => {
        const filters = parseRoomFilters(new URLSearchParams(
            'date=2026-02-30&startTime=25%3A90&durationMinutes=17&minCapacity=-1',
        ));

        expect(filters).toEqual({ date: null, startTime: '', durationMinutes: null, minCapacity: null });
    });

    it('обновляет фильтры, сохраняя остальные параметры адреса', () => {
        const next = updateRoomFilterSearchParams(
            new URLSearchParams('officeId=office-1&keep=yes&date=2026-11-01'),
            { date: new Date(2026, 10, 5), startTime: '1015', durationMinutes: 60, minCapacity: null },
        );

        expect(next.get('officeId')).toBe('office-1');
        expect(next.get('keep')).toBe('yes');
        expect(next.get('date')).toBe('2026-11-05');
        expect(next.get('startTime')).toBe('10:15');
        expect(next.get('durationMinutes')).toBe('60');
        expect(next.has('minCapacity')).toBe(false);
    });
});
