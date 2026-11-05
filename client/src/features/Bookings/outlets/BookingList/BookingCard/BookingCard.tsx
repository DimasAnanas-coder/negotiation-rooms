import type { Booking } from '../../../../../types/Booking';
import { formatOfficeTime } from '../../../../../utils/officeTime';
import Button from '../../../../../components/ui/Button';
import DoorOpenIcon from '../../../../../assets/icons/door-open.svg';
import TrashIcon from '../../../../../assets/icons/trash.svg';
import BookingCardSkeleton from './BookingCardSkeleton';

function getDateParts(value: string, timezone: string) {
    const date = new Date(value);
    const parts = new Intl.DateTimeFormat('ru-RU', {
        timeZone: timezone,
        day: 'numeric',
        month: 'long',
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return { day: values.day, month: values.month.toLocaleUpperCase('ru-RU') };
}

export default function BookingCard({
    booking,
    isLoading = false,
    canCancel = false,
    onCancel,
}: {
    booking?: Booking;
    isLoading?: boolean;
    canCancel?: boolean;
    onCancel?: (booking: Booking) => void;
}) {
    if (isLoading || !booking) return <BookingCardSkeleton />;

    const timezone = booking.office.timezone;
    const start = formatOfficeTime(booking.startsAt, timezone);
    const end = formatOfficeTime(booking.endsAt, timezone);
    const { day, month } = getDateParts(booking.startsAt, timezone);
    const officeTimeZone = new Intl.DateTimeFormat('ru-RU', { timeZone: timezone, timeZoneName: 'short' })
        .formatToParts(new Date(booking.startsAt))
        .find(part => part.type === 'timeZoneName')?.value;

    const officeTimeElement = <span>{start}–{end} {officeTimeZone}</span>;
    const circleSeparator = <span className="flex justify-center items-center size-1 rounded-full bg-disabled shrink-0"/>;
    return (
        <article className="flex items-center gap-4 rounded-xl border border-primary-border bg-primary-bg p-4">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary-bg">
                <span className="text-[10px] font-medium text-disabled">{month}</span>
                <span className="text-xl font-bold text-title">{day}</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col text-xs gap-1">
                <h2 className="truncate text-sm font-bold text-title">{booking.title}</h2>
                <div className="mt-1 flex min-w-0 items-center gap-4">
                    <div className='flex flex-row gap-1.5'>
                        <img src={DoorOpenIcon} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
                        <span className="shrink-0 font-semibold text-accent">{booking.room.name}</span>
                    </div>
                    {circleSeparator}
                    <span className="truncate">{booking.room.floor} этаж</span>
                    <div className='flex-row items-center gap-4 hidden sm:flex'>
                        {circleSeparator}
                        {officeTimeElement}
                    </div>
                </div>
                <div className='hidden max-sm:block'>
                    {officeTimeElement}
                </div>
            </div>
            {canCancel && (
                <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0 border-error! bg-primary-bg! text-error! hover:bg-error-bg! max-sm:px-2!"
                    onClick={() => onCancel?.(booking)}
                >
                    <img src={TrashIcon} alt="Отменить" className="size-4 sm:hidden" aria-label="Отменить бронирование"/>
                    <p className="hidden sm:block">Отменить</p>
                </Button>
            )}
        </article>
    );
}
