import type { Booking, BookingScope } from '../../../../types/Booking';
import type { RequestStatus } from '../../../../types/RequestStatus';
import BookingCard from './BookingCard';

interface BookingListProps {
    bookings: Booking[];
    status: RequestStatus;
    scope: BookingScope;
    onCancel: (booking: Booking) => void;
}

export default function BookingList({ bookings, status, scope, onCancel }: BookingListProps) {
    if (status === 'loading') {
        return (
            <div className="space-y-4" aria-label="Загрузка бронирований" aria-busy="true">
                <BookingCard isLoading />
                <BookingCard isLoading />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map(booking => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    canCancel={scope === 'upcoming'}
                    onCancel={onCancel}
                />
            ))}
        </div>
    );
}
