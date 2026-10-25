import Container from '../components/ui/Container';
import BreadCrumbs from '../features/Rooms/layouts/BreadCrumbs';
import RoomDetail from '../features/Rooms/layouts/RoomDetail';
import type { Office } from '../types/Office';
import type { Room as RoomInfo } from '../types/Rooms';

const room: RoomInfo = {
    id: 'room-everest',
    officeId: 'office-moscow',
    name: 'Эверест',
    floor: 4,
    capacity: 12,
    features: [
        { code: 'display', name: 'Проектор и ТВ-панель 4К' },
        { code: 'whiteboard', name: 'Маркерная доска' },
        { code: 'video', name: 'Система видеоконференций' },
    ],
};

const office: Office = {
    id: 'office-moscow',
    name: 'Офис Москва',
    address: 'Москва, ул. Лесная, 7',
    timezone: 'Europe/Moscow',
};

export default function Room() {
    return (
        <div className="min-h-full bg-secondary-bg py-7">
            <Container>
                <BreadCrumbs officeName={office.name} roomName={room.name} status="active" />
                <div className="mt-3 flex flex-col items-start gap-8 lg:flex-row">
                    <RoomDetail room={room} office={office} status="active" />
                    <div />
                </div>
            </Container>
        </div>
    );
}
