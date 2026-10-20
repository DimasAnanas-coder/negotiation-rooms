import type { RoomCardArgs } from './types';

export default function ReserveBookButton({
    roomStatus,
    room,
}: RoomCardArgs) {
    const handleReserve = () => { alert(`Резервация ${room?.name}`); };
    const className = roomStatus == 'available' ? 'bg-active-bg text-secondary' : 'bg-disabled-bg text-disabled';

    return (
        <button
            className={`flex items-center justify-center py-2.5 px-4 ${className} rounded-lg`}
            onClick={handleReserve}
        >
            <p className="font-semibold text-sm">Забронировать</p>
        </button>
    );
}
