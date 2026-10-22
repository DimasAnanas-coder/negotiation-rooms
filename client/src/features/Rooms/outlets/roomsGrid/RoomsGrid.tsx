import Container from '../../../../components/ui/Container';
import type { RequestStatus } from '../../../../types/RequestStatus';
import type { Room } from '../../../../types/Rooms';
import RoomCard from './RoomCard';

const LOADING_SKELETON_ROOMS: Array<undefined> = Array.from({ length: 4 }, () => undefined);

interface RoomsGridProps {
    rooms: Room[];
    status: Exclude<RequestStatus, 'error'>;
}

export default function RoomsGrid({ rooms, status }: RoomsGridProps) {
    const visibleRooms: Array<Room | undefined> = status === 'loading'
        ? LOADING_SKELETON_ROOMS
        : rooms;

    return (
        <Container className="flex flex-col bg-secondary-bg px-10 py-4 gap-4">
            <p className="text-[22px] font-extrabold text-title">
                {status === 'loading'
                    ? 'Загрузка переговорных…'
                    : 'Доступные переговорные в этом офисе'}
            </p>
            <div className="grid grid-cols-3 gap-6">
                {visibleRooms.map((room, index) => (
                    <RoomCard
                        key={room?.id ?? `skeleton-${index}`}
                        roomStatus={status === 'loading' ? 'loading' : 'available'}
                        room={room}
                    />
                ))}
            </div>
        </Container>
    );
}
