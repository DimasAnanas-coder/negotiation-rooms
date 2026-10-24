import type { RoomStatus } from './types';

export default function AvailabilityBar({
    roomStatus,
}: {
    roomStatus: RoomStatus;
}) {
    const isAvailable = roomStatus === 'available';
    const barBg = isAvailable ? 'bg-highlight-bg' : 'bg-disabled-bg';
    const availabilityText = roomStatus === 'available'
        ? 'Доступно на выбранное время'
        : roomStatus === 'unavailable'
            ? 'Недоступно на выбранное время'
            : 'Укажите дату и время';
    return (
        <div className={
            `flex flex-row ${barBg} rounded-lg gap-2 items-center p-2.5`
        }
        >
            <div className={`${isAvailable ? 'bg-accent' : 'bg-disabled'} w-1.5 h-1.5 rounded-full`} />
            <p className={`${isAvailable ? 'text-accent' : 'text-disabled'} text-[12px] font-semibold`}>
                { availabilityText }
            </p>
        </div>
    );
}
