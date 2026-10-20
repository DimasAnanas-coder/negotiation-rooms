import type { RoomStatus } from './types';

export default function AvailabilityBar({
    roomStatus,
}: {
    roomStatus: RoomStatus;
}) {
    const barBg = roomStatus == 'available' ? 'bg-highlight-bg' : 'bg-disabled-bg';
    const availabilityText = roomStatus == 'available' ? 'Доступно на выбранное время' : 'Недоступно на выбранное время';
    return (
        <div className={
            `flex flex-row ${barBg} rounded-lg gap-2 items-center p-2.5`
        }
        >
            <div className={`${roomStatus == 'available' ? 'bg-accent' : 'bg-disabled'} w-1.5 h-1.5 rounded-full`} />
            <p className={`${roomStatus == 'available' ? 'text-accent' : 'text-disabled'} text-[12px] font-semibold`}>
                { availabilityText }
            </p>
        </div>
    );
}
