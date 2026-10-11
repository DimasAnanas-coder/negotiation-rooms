export const DEFAULT_TIME_DIGITS = '1500';

/** Ограничивает число диапазоном [min, max] */
export function clamp(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, n));
}

/**
 * Форматирует цифры в маску HH:MM с прочерками.
 * "1500" → "15:00"
 * "15"   → "15:--"
 * "150"  → "15:0-"
 * ""     → "--:--"
 */
export function formatTimeMask(digits: string): string {
    const h = (digits.slice(0, 2) + '--').slice(0, 2);
    const m = (digits.slice(2, 4) + '--').slice(0, 2);
    return `${h}:${m}`;
}

/**
 * Достаёт цифры из ввода, валидирует и ограничивает 4 символами.
 * Часы клампятся к 0..23, минуты — к 0..59.
 */
export function normalizeTimeDigits(raw: string): string {
    let digits = raw.replace(/\D/g, '').slice(0, 4);

    if (digits.length >= 2) {
        const hh = String(clamp(Number(digits.slice(0, 2)), 0, 23)).padStart(2, '0');
        digits = hh + digits.slice(2);
    }

    if (digits.length === 4) {
        const mm = String(clamp(Number(digits.slice(2, 4)), 0, 59)).padStart(2, '0');
        digits = digits.slice(0, 2) + mm;
    }

    return digits;
}

/**
 * Дополняет неполный ввод до валидного времени (для onBlur).
 * "15" → "1500"
 * ""   → "1500"
 */
export function completeTimeDigits(digits: string, fallback = DEFAULT_TIME_DIGITS): string {
    if (digits.length === 0) return fallback;
    const padded = (digits + '0000').slice(0, 4);
    const hh = String(clamp(Number(padded.slice(0, 2)), 0, 23)).padStart(2, '0');
    const mm = String(clamp(Number(padded.slice(2, 4)), 0, 59)).padStart(2, '0');
    return hh + mm;
}
