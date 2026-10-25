import { useState } from 'react';
import CalendarSelector from '../../../../components/ui/input/selectors/CalendarSelector/CalendarSelector';
import { useCurrentUser, useRoomBookings } from '../../../../hooks';
import { formatOfficeTime, getOfficeWorkdayRange } from '../../../../utils/officeTime';
import ScheduleSkeleton from './ScheduleSkeleton';

const WORKDAY_DURATION_MINUTES = 11 * 60;
const SLOT_MINUTES = 15;
const TIMELINE_HEIGHT = 704;

type ScheduleProps
    = | { status: 'loading' }
        | { status: 'active'; roomId: string; timezone: string };

function formatScheduleDate(date: Date | null, timezone: string): string {
    const displayDate = date
        ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12))
        : new Date();
    const dateTimezone = date ? 'UTC' : timezone;
    const label = new Intl.DateTimeFormat('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: dateTimezone,
    }).format(displayDate);

    return label.replace(/^\p{L}/u, letter => letter.toLocaleUpperCase('ru-RU'));
}

function getOfficeCurrentDate(timezone: string): Date {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    return new Date(Number(values.year), Number(values.month) - 1, Number(values.day));
}

export default function Schedule(props: ScheduleProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const roomId = props.status === 'active' ? props.roomId : null;
    const timezone = props.status === 'active' ? props.timezone : 'UTC';
    const calendarDate = selectedDate ?? getOfficeCurrentDate(timezone);
    const interval = props.status === 'active'
        ? getOfficeWorkdayRange(selectedDate, timezone)
        : null;
    const { bookings, status: bookingsStatus } = useRoomBookings(roomId, interval);
    const { user, status: userStatus } = useCurrentUser();

    if (
        props.status === 'loading'
        || bookingsStatus !== 'loaded'
        || userStatus !== 'loaded'
        || !user
        || !interval
    ) {
        return <ScheduleSkeleton />;
    }

    const intervalStart = Date.parse(interval.from);
    const intervalEnd = Date.parse(interval.to);
    const intervalDuration = intervalEnd - intervalStart;
    const slotCount = intervalDuration / (SLOT_MINUTES * 60_000);
    const hours = Array.from({ length: 12 }, (_, index) => index + 9);
    const quarterHourBoundaries = Array.from({ length: slotCount + 1 }, (_, index) => index);

    return (
        <section className="min-h-160 w-full flex-1 rounded-2xl border border-primary-border bg-primary-bg p-6 lg:w-auto" aria-labelledby="schedule-title">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h2 id="schedule-title" className="text-xl font-bold text-title">Расписание на день</h2>
                    <p className="mt-1 text-sm">{formatScheduleDate(selectedDate, timezone)}</p>
                </div>
                <CalendarSelector
                    value={calendarDate}
                    onChange={setSelectedDate}
                    showClearOption={false}
                    dropdownAlign="right"
                />
            </header>

            <div className="mt-6 grid grid-cols-[52px_minmax(0,1fr)]">
                <div className="relative" style={{ height: TIMELINE_HEIGHT }} aria-hidden="true">
                    {hours.map((hour, index) => (
                        <span
                            className="absolute left-0 text-sm text-disabled"
                            key={hour}
                            style={{
                                top: `${((index * 60) / WORKDAY_DURATION_MINUTES) * 100}%`,
                                transform: index === 0
                                    ? 'translateY(0)'
                                    : index === hours.length - 1
                                        ? 'translateY(-100%)'
                                        : 'translateY(-50%)',
                            }}
                        >
                            {`${String(hour).padStart(2, '0')}:00`}
                        </span>
                    ))}
                </div>

                <div className="relative" style={{ height: TIMELINE_HEIGHT }}>
                    {quarterHourBoundaries.map(boundary => (
                        <div
                            className={`absolute inset-x-0 border-t ${boundary % 4 === 0 ? 'border-primary-border' : 'border-primary-border/50'}`}
                            key={boundary}
                            style={{ top: `${(boundary / slotCount) * 100}%` }}
                            aria-hidden="true"
                        />
                    ))}

                    {bookings.map((booking) => {
                        const startOffset = Math.max(0, Date.parse(booking.startsAt) - intervalStart);
                        const endOffset = Math.min(intervalDuration, Date.parse(booking.endsAt) - intervalStart);
                        const duration = endOffset - startOffset;

                        if (duration <= 0) return null;

                        const isOwnBooking = booking.userId === user.id;
                        const title = isOwnBooking ? booking.title : 'Занято';
                        const start = formatOfficeTime(booking.startsAt, timezone);
                        const end = formatOfficeTime(booking.endsAt, timezone);

                        return (
                            <article
                                aria-label={`${title}, ${start}–${end}`}
                                className={`absolute inset-x-0 z-10 overflow-hidden rounded-lg border px-2 text-xs leading-3 ${isOwnBooking
                                    ? 'border-accent bg-highlight-bg text-highlight'
                                    : 'border-primary-border bg-[#F1F5F9] text-title'}`}
                                key={booking.id}
                                style={{
                                    top: `${(startOffset / intervalDuration) * 100}%`,
                                    height: `${(duration / intervalDuration) * 100}%`,
                                }}
                            >
                                <span className="block truncate" title={`${title}, ${start}–${end}`}>
                                    {title}
                                </span>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
