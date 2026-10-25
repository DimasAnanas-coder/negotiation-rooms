import { useParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import Schedule from '../features/Rooms/outlets/Schedule';
import BreadCrumbs from '../features/Rooms/layouts/BreadCrumbs';
import RoomDetail from '../features/Rooms/layouts/RoomDetail';
import { useRoom } from '../hooks';

export default function Room() {
    const { roomId } = useParams();
    const { room, status } = useRoom(roomId);
    const layoutStatus = status === 'loaded' && room ? 'active' : 'loading';
    const breadcrumbsProps = layoutStatus === 'active'
        ? { status: 'active' as const, officeName: room.office.name, roomName: room.name }
        : { status: 'loading' as const };
    const roomDetailProps = layoutStatus === 'active'
        ? { status: 'active' as const, room, office: room.office }
        : { status: 'loading' as const };

    return (
        <div className="min-h-full bg-secondary-bg py-7">
            <Container>
                <BreadCrumbs {...breadcrumbsProps} />
                <div className="mt-3 flex flex-col items-start gap-8 lg:flex-row">
                    <RoomDetail {...roomDetailProps} />
                    <Schedule status={layoutStatus} />
                </div>
            </Container>
        </div>
    );
}
