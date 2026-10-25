import { useRef, useState, type SubmitEvent } from 'react';
import { createBooking } from '../../../api/bookings';
import { formatOfficeTime } from '../../../utils/officeTime';
import type { BookingOptions } from '../types';
import { getBookingRequestError, validateBooking, type BookingField, type BookingFieldErrors } from '../lib/bookingValidation';

function officeDate(value: Date, timezone: string) {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(value);
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
}

export default function useBookingForm({ room, timezone, interval }: BookingOptions) {
    const pending = useRef(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(() => officeDate(interval ? new Date(interval.from) : new Date(), timezone));
    const [time, setTime] = useState(() => interval ? formatOfficeTime(interval.from, timezone) : '09:00');
    const [duration, setDuration] = useState(() => interval ? (Date.parse(interval.to) - Date.parse(interval.from)) / 60_000 : 60);
    const [comment, setComment] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<BookingFieldErrors>({});
    const [success, setSuccess] = useState(false);

    const clearFieldError = (field: BookingField) => {
        setError('');
        setFieldErrors((current) => {
            const next = { ...current };
            delete next[field];
            if (field === 'date' || field === 'time' || field === 'duration') {
                delete next.date;
                delete next.time;
                delete next.duration;
            }
            return next;
        });
    };

    const submit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending.current) return;
        setError('');
        const validation = validateBooking({ title, date, time, duration, comment }, timezone);
        setFieldErrors(validation.fieldErrors);
        if (Object.keys(validation.fieldErrors).length || !validation.interval) return;
        const range = validation.interval;
        try {
            pending.current = true;
            setSaving(true);
            await createBooking({
                roomId: room.id, title: title.trim(), comment: comment.trim(), startsAt: range.from, endsAt: range.to,
            });
            setSuccess(true);
        }
        catch (error) {
            const requestError = getBookingRequestError(error);
            setError(requestError.error);
            setFieldErrors(requestError.fieldErrors);
        }
        finally {
            pending.current = false;
            setSaving(false);
        }
    };
    return {
        title,
        setTitle: (value: string) => {
            setTitle(value);
            clearFieldError('title');
        },
        date,
        setDate: (value: string) => {
            setDate(value);
            clearFieldError('date');
        },
        time,
        setTime: (value: string) => {
            setTime(value);
            clearFieldError('time');
        },
        duration,
        setDuration: (value: number) => {
            setDuration(value);
            clearFieldError('duration');
        },
        comment,
        setComment: (value: string) => {
            setComment(value);
            clearFieldError('comment');
        },
        saving, error, fieldErrors, success, submit,
        isPending: () => pending.current,
    };
}
