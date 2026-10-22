import type { ReactNode } from 'react';
import useRooms from '../../../../hooks/useRooms';
import RoomCard from './RoomCard';
import Container from '../../../../components/ui/Container';
import type { Room } from '../../../../types/Rooms';
import ErrorLoadingState from '../../states/ErrorLoadingState';
import NotFoundRoomsState from '../../states/NotFoundRoomsState';

export default function RoomsGrid() {
    // TODO: сделать выбор офиса из нового хука useOffice. Полученный офис передавать в хук useRooms, 
    // чтобы получать комнаты именно от него, и добавить проверку офис ли это или пункт "не выбрано", 
    // если так, то показывать OfficeNotSelectedState
    const { rooms, loading, refetch } = useRooms();

    if (loading == 'error'){
        return (
            <div className='flex '>
                <ErrorLoadingState
                    onClick={refetch}
                />
            </div>
        )
    }
    if (rooms.length == 0) {
        return (
            <NotFoundRoomsState
                onClick={() => {}} // TODO: добавить сюда пробрасывание функции для очистки параметров 
            />
        )
    }

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
