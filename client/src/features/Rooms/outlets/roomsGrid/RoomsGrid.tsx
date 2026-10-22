import useRooms from '../../../../hooks/useRooms';
import RoomCard from './RoomCard';
import Container from '../../../../components/ui/Container';
import ErrorRoomsState from '../../states/ErrorRoomsState';
import NotFoundRoomsState from '../../states/NotFoundRoomsState';
import OfficeNotSelectedState from '../../states/OfficeNotSelectedState';
import type { RequestStatus } from '../../../../types/RequestStatus';
import ErrorOfficesState from '../../states/ErrorOfficesState';

const LOADING_SKELETON_ROOMS = Array.from({ length: 4 }, () => undefined);

interface RoomsGridAtgs { 
    officeId: string | null;
    officeStatus: RequestStatus;
    refetchOffices: () => void;
}

export default function RoomsGrid({ 
    officeId, 
    officeStatus,
    refetchOffices, 
}: RoomsGridAtgs) {
    if (officeStatus === 'error') {
        return (
            <div className="flex">
                <ErrorOfficesState onClick={refetchOffices} />
            </div>
        );
    }

    const { rooms, status, refetch } = useRooms(officeId);
    if (status === 'error') {
        return (
            <div className="flex">
                <ErrorRoomsState onClick={refetch} />
            </div>
        );
    }

    if (!officeId) return <OfficeNotSelectedState />;

    if (status === 'loaded' && rooms.length === 0) {
        return (
            <NotFoundRoomsState
                onClick={() => {}} // TODO: добавить сюда пробрасывание функции для очистки параметров 
            />
        )
    }

    const visibleRooms = status === 'loading'
        ? LOADING_SKELETON_ROOMS
        : rooms;

    return (
        <Container className="flex flex-col bg-secondary-bg px-10 py-4 gap-4">
            <p className="text-[22px] font-extrabold text-title">
                {status === 'loading' ? 'Загрузка переговорных…' : 'Доступные переговорные в этом офисе'}
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
