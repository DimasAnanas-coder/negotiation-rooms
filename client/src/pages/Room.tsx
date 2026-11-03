import { useParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import Schedule from '../features/Bookings/outlets/Schedule';
import BreadCrumbs from '../features/Bookings/layout/BreadCrumbs';
import RoomDetail from '../features/Bookings/layout/RoomDetail';
import { useRoom } from '../hooks';
import ScheduleErrorState from '../features/Bookings/states/ScheduleErrorState';

export default function Room() {
    const { roomId } = useParams();
    const { room, status, refetch } = useRoom(roomId);
    const hasLoadedRoom = status === 'loaded' && room !== null;
    const breadcrumbsProps = hasLoadedRoom
        ? { status: 'active' as const, officeId: room.office.id, officeName: room.office.name, roomName: room.name }
        : { status: 'loading' as const };
    const roomDetailProps = hasLoadedRoom
        ? { status: 'active' as const, room, office: room.office }
        : { status: 'loading' as const };
    const scheduleProps = hasLoadedRoom
        ? { status: 'active' as const, room, timezone: room.office.timezone }
        : { status: 'loading' as const };
    const scheduleContent = status === 'error' 
        ? <ScheduleErrorState onRetry={refetch}/>
        : <Schedule {...scheduleProps} />;

    return (
        <div className="min-h-full bg-secondary-bg py-7">
            <Container>
                <BreadCrumbs {...breadcrumbsProps} />
                <div className="mt-3 flex flex-col items-start gap-8 lg:flex-row">
                    <RoomDetail {...roomDetailProps} />
                    {scheduleContent}
                </div>
            </Container>
        </div>
    );
}
