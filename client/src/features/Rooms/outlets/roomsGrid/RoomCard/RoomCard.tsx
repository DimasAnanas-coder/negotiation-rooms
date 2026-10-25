import UsersIcon from '../../../../../assets/icons/users.svg';
import ClockIcon from '../../../../../assets/icons/clock.svg';

import RoomCardSkeleton from './RoomCardSkeleton';
import type { RoomCardArgs } from './types';
import RoomCardWrapper from './RoomCardWrapper';
import { Link } from 'react-router-dom';
import ReserveBookButton from './ReserveBookButton';
import AvailabilityBar from './AvailabilityBar';
import { useRoomBookings } from '../../../../../hooks';
import { formatOfficeTime } from '../../../../../utils/officeTime';

export default function RoomCard({
    roomStatus,
    room,
    timezone,
    scheduleInterval = null,
    availabilityInterval = null,
}: RoomCardArgs) {
    const {
        bookings,
        status: scheduleStatus,
        refetch: refetchSchedule,
    } = useRoomBookings(room?.id ?? null, scheduleInterval);

    if (roomStatus == 'loading' || room == undefined) {
        return <RoomCardSkeleton />;
    }

    const detail = '/rooms';
    let occupancyLabel = 'Укажите дату и время';

    if (scheduleStatus === 'loading') {
        if (roomStatus === 'unavailable') occupancyLabel = 'Занята до --:--';
        if (roomStatus === 'available') occupancyLabel = 'Свободна весь день';
    } else if (scheduleStatus === 'error') {
        occupancyLabel = 'Не удалось загрузить расписание';
    } else if (timezone) {
        const matchingBooking = availabilityInterval
            ? bookings.find((booking) => (
                Date.parse(booking.startsAt) < Date.parse(availabilityInterval.to)
                && Date.parse(booking.endsAt) > Date.parse(availabilityInterval.from)
            ))
            : undefined;

        if (roomStatus === 'unavailable' && matchingBooking) {
            occupancyLabel = `Занята до ${formatOfficeTime(matchingBooking.endsAt, timezone)}`;
        } else {
            const now = Date.now();
            const currentBooking = bookings.find((booking) => (
                Date.parse(booking.startsAt) <= now && Date.parse(booking.endsAt) > now
            ));
            const nextBooking = bookings.find((booking) => Date.parse(booking.endsAt) > now);
            const lastBooking = bookings.at(-1);

            if (currentBooking) {
                occupancyLabel = `Занята до ${formatOfficeTime(currentBooking.endsAt, timezone)}`;
            } else if (nextBooking) {
                occupancyLabel = `Свободна до ${formatOfficeTime(nextBooking.startsAt, timezone)}`;
            } else if (lastBooking) {
                occupancyLabel = `Свободна после ${formatOfficeTime(lastBooking.endsAt, timezone)}`;
            } else {
                occupancyLabel = 'Свободна весь день';
            }
        }
    }

    return (
        <RoomCardWrapper>
            <div className="gap-1">
                <p className="text-title font-bold text-lg">{room.name}</p>
                <p className="text-[13px]">
                    {room.floor}
                    {' '}
                    этаж
                </p>
            </div>

            <div className="gap-2 text-[13px]">
                <div className="flex flex-row gap-2">
                    <img src={UsersIcon} />
                    <p>
                        {`Вместимость: до ${room.capacity} человек`}
                    </p>
                </div>

                <div className="flex flex-row gap-2">
                    <img src={ClockIcon} />
                    <p>{occupancyLabel}</p>
                </div>
            </div>

            <AvailabilityBar
                roomStatus={roomStatus}
            />

            <div className="flex flex-row gap-3 justify-between w-full">
                <Link
                    className="flex items-center justify-center py-2.5 px-4"
                    to={detail}
                >
                    <p className="text-accent font-semibold text-sm">Подробнее</p>
                </Link>
                <ReserveBookButton
                    roomStatus={roomStatus}
                    room={room}
                />
            </div>

        </RoomCardWrapper>
    );
}
