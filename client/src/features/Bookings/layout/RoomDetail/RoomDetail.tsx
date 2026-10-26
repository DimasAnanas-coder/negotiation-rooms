import type { Office } from '../../../../types/Office';
import type { Room } from '../../../../types/Rooms';
import RoomFeature from './RoomFeature';
import RoomDetailSkeleton from './RoomDetailSkeleton';

type RoomDetailProps
    = | { status: 'loading' }
        | {
            status: 'active';
            room: Room;
            office: Office;
        };

export default function RoomDetail(props: RoomDetailProps) {
    if (props.status === 'loading') {
        return <RoomDetailSkeleton />;
    }

    const { room, office } = props;

    return (
        <aside
            className="w-full rounded-2xl border border-primary-border bg-primary-bg p-6 lg:w-105"
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
