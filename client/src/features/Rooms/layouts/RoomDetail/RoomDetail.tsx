import type { Office } from '../../../../types/Office';
import type { Room } from '../../../../types/Rooms';
import type { LayoutStatus } from '../types';
import RoomFeature from './RoomFeature';
import RoomDetailSkeleton from './RoomDetailSkeleton';

interface RoomDetailProps {
    room: Room;
    office: Office;
    status: LayoutStatus;
}

export default function RoomDetail({ room, office, status }: RoomDetailProps) {
    if (status === 'loading') {
        return <RoomDetailSkeleton />;
    }

    return (
        <aside 
            className="w-full rounded-2xl border border-primary-border bg-primary-bg p-6 lg:w-[420px]"
        >
            <h1 id="room-title" className="text-2xl font-extrabold text-title">{room.name}</h1>
            <p className="mt-2 text-sm">{office.name} · {office.address}</p>
            <ul className="mt-5 flex flex-col gap-3 border-t border-primary-border pt-5 text-sm">
                <RoomFeature feature={{ code: 'capacity', name: `Вместимость: до ${room.capacity} человек` }} />
                {room.features.map(feature => <RoomFeature key={feature.code} feature={feature} />)}
            </ul>
        </aside>
    );
}
