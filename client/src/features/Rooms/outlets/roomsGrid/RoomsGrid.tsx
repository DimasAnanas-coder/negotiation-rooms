import type { ReactNode } from 'react';
import useRooms from '../../../../hooks/useRooms';
import RoomCard from './RoomCard';
import Container from '../../../../components/ui/Container';
import type { Room } from '../../../../types/Rooms';

export default function RoomsGrid() {
    const { rooms, loading } = useRooms();
    return (
        <Container className="flex flex-col bg-secondary-bg px-10 py-4 gap-4">
            <p className="text-[22px] font-extrabold text-title">
                {loading == 'loading' ? 'Загрузка переговорных...' : 'Доступные переговорные в этом офисе'}
            </p>
            <div className="grid grid-cols-3 gap-6">
                {
                    rooms.map((room: Room | undefined, index: number): ReactNode => {
                        return (
                            <RoomCard
                                key={index}
                                roomStatus={loading == 'loading' ? 'loading' : 'available'}
                                room={room}
                            />
                        );
                    })
                }
            </div>
        </Container>
    );
}
