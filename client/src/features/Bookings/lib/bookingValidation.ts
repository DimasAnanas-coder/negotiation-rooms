import { isAxiosError } from 'axios';
import { BookingIntervalError, getOfficeBookingInterval, type UtcInterval } from '../../../utils/officeTime';

export interface BookingValues {
    title: string;
    date: string;
    time: string;
    duration: number;
    comment: string;
}

export type BookingField = keyof BookingValues;
export type BookingFieldErrors = Partial<Record<BookingField, string>>;

export function validateBooking(values: BookingValues, timezone: string) {
    const fieldErrors: BookingFieldErrors = {};
    let interval: UtcInterval | null = null;

    if (!values.title.trim()) fieldErrors.title = 'Обязательное поле';
    else if (values.title.trim().length > 200) fieldErrors.title = 'Не более 200 символов';
    if (values.comment.trim().length > 2000) fieldErrors.comment = 'Не более 2000 символов';

    try {
        interval = getOfficeBookingInterval(values.date, values.time, values.duration, timezone);
    }
    catch (error) {
        if (!(error instanceof BookingIntervalError)) throw error;
        fieldErrors[error.field] = error.message;
    }

    return { fieldErrors, interval };
}

interface BookingErrorResponse {
    error?: {
        code?: string;
        message?: string;
        details?: { issues?: { path: string; message: string }[] };
    };
}

export function getBookingRequestError(error: unknown) {
    const fieldErrors: BookingFieldErrors = {};
    const fallback = 'Не удалось создать бронирование. Попробуйте ещё раз.';
    if (!isAxiosError<BookingErrorResponse>(error)) return { fieldErrors, error: fallback };

    const apiError = error.response?.data?.error;
    if (error.response?.status === 409) {
        fieldErrors.time = 'Это время уже занято. Выберите другое время встречи.';
    }
    else {
        const fieldsByCode: Record<string, BookingField> = {
            START_NOT_IN_FUTURE: 'time',
            BOOKING_TOO_FAR_AHEAD: 'date',
            INVALID_DATE: 'date',
            TIME_NOT_ALIGNED: 'time',
            DURATION_TOO_SHORT: 'duration',
            END_BEFORE_START: 'duration',
            OUTSIDE_WORKING_HOURS: 'duration',
        };
        const field = fieldsByCode[apiError?.code ?? ''];
        if (field) fieldErrors[field] = apiError?.message ?? fallback;

        const fieldsByPath: Record<string, BookingField> = {
            title: 'title', comment: 'comment', startsAt: 'time', endsAt: 'duration',
        };
        for (const issue of apiError?.details?.issues ?? []) {
            const issueField = fieldsByPath[issue.path];
            if (issueField) fieldErrors[issueField] = issue.message;
        }
    }

    return {
        fieldErrors,
        error: Object.keys(fieldErrors).length ? '' : apiError?.message ?? fallback,
    };
}
