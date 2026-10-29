import { createBooking } from '../../../api/rest/bookings';
import useForm from '../../../hooks/useForm';
import { formatOfficeTime } from '../../../utils/officeTime';
import type { BookingOptions } from '../types';
import { getBookingRequestError, validateBooking, type BookingValues } from '../lib/bookingValidation';

function officeDate(value: Date, timezone: string) {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(value);
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
}

export default function useBookingForm({ room, timezone, interval }: BookingOptions) {
    return useForm({
        initialValues: (): BookingValues => ({
            title: '',
            date: officeDate(interval ? new Date(interval.from) : new Date(), timezone),
            time: interval ? formatOfficeTime(interval.from, timezone) : '09:00',
            duration: interval ? (Date.parse(interval.to) - Date.parse(interval.from)) / 60_000 : 60,
            comment: '',
        }),
        validate: values => validateBooking(values, timezone),
        onSubmit: (range, values) => createBooking({
            roomId: room.id,
            title: values.title.trim(),
            comment: values.comment.trim(),
            startsAt: range.from,
            endsAt: range.to,
        }),
        getRequestError: getBookingRequestError,
        errorGroups: [['date', 'time', 'duration']],
    });
}
