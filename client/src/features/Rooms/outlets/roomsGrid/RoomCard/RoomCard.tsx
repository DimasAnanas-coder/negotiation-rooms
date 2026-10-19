import UsersIcon from '../../../../../assets/icons/users.svg';
import ClockIcon from '../../../../../assets/icons/clock.svg';

import RoomCardSkeleton from './RoomCardSkeleton';
import type { RoomCardArgs } from './types';
import RoomCardWrapper from './RoomCardWrapper';
import { Link } from 'react-router-dom';
import ReserveBookButton from './ReserveBookButton';
import AvailabilityBar from './AvailabilityBar';


export default function RoomCard({
    roomStatus,
    room,
}: RoomCardArgs) {
    if (roomStatus == "loading" || room == undefined) {
        return <RoomCardSkeleton/>;
    }

    const detail = "/rooms";

    return (
        <RoomCardWrapper>
            <div className='gap-1'>
                <p className='text-title font-bold text-lg'>{room.name}</p>
                <p className='text-[13px]'>{room.floor} этаж</p>
            </div>

            <div className='gap-2 text-[13px]'>
                <div className='flex flex-row gap-2'>
                    <img src={UsersIcon} />
                    <p>Вместимость: до {room.capacity} человек</p>
                </div>

                <div className='flex flex-row gap-2'>
                    <img src={ClockIcon} />
                    <p>Занята до 14:00 </p>
                </div>
            </div>

            <AvailabilityBar
                roomStatus={roomStatus}
            />

            <div className='flex flex-row gap-3 justify-between w-full'>
                <Link className='flex items-center justify-center py-2.5 px-4'
                    to={detail}
                >
                    <p className='text-accent font-semibold text-sm'>Подробнее</p>
                </Link>
                <ReserveBookButton
                    roomStatus={roomStatus}
                    room={room}
                />
            </div>

        </RoomCardWrapper>
    )
}