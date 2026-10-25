import { useParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import BreadCrumbs from '../features/Rooms/layouts/BreadCrumbs';
import RoomDetail from '../features/Rooms/layouts/RoomDetail';
import { useRoom } from '../hooks';

export default function Room() {
    const { roomId } = useParams();
    const { room, status } = useRoom(roomId);
    const breadcrumbsProps = status === 'loaded' && room
        ? { status: 'active' as const, officeName: room.office.name, roomName: room.name }
        : { status: 'loading' as const };
    const roomDetailProps = status === 'loaded' && room
        ? { status: 'active' as const, room, office: room.office }
        : { status: 'loading' as const };

    return (
        <div className="min-h-full bg-secondary-bg py-7">
            <Container>
                <BreadCrumbs {...breadcrumbsProps} />
                <div className="mt-3 flex flex-col items-start gap-8 lg:flex-row">
                    <RoomDetail {...roomDetailProps} />
                    <div />
                </div>
            </Container>
        </div>
    );
}
