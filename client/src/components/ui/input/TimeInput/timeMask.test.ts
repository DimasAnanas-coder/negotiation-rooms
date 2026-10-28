import { describe, expect, it } from 'vitest';
import { completeTimeDigits, formatTimeMask, normalizeTimeDigits } from './timeMask';

describe('timeMask', () => {
    it('форматирует неполное время', () => {
        expect(formatTimeMask('15')).toBe('15:--');
        expect(formatTimeMask('')).toBe('--:--');
    });

    it('убирает лишние символы и ограничивает значения часов и минут', () => {
        expect(normalizeTimeDigits('2a5990')).toBe('2359');
        expect(normalizeTimeDigits('')).toBe('');
    });

    it('дополняет неполное время нулями при завершении ввода', () => {
        expect(completeTimeDigits('15')).toBe('1500');
        expect(completeTimeDigits('')).toBe('');
    });
});
