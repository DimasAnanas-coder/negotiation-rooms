import BookingButton from '../../../../Bookings/components/BookingButton';
import type { RoomCardArgs } from './types';

export default function ReserveBookButton({
    roomStatus,
    room,
    timezone,
    availabilityInterval,
}: RoomCardArgs) {
    if (!room || !timezone) return null;

    return (
        <BookingButton
            label="Забронировать"
            room={room}
            timezone={timezone}
            interval={availabilityInterval}
            disabled={roomStatus === 'loading' || roomStatus === 'unavailable'}
        />
    );
}
