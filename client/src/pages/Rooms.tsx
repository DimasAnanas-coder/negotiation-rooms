import { useState, type ReactNode } from 'react';
import FilterBar from '../features/Rooms/layout/FilterBar';
import OfficeSelector from '../features/Rooms/layout/OfficeSelector';
import RoomsGrid from '../features/Rooms/outlets/roomsGrid';
import {
    ErrorOfficesState,
    ErrorRoomsState,
    NotFoundRoomsState,
    OfficeNotSelectedState,
} from '../features/Rooms/states';
import { useOffices, useRooms } from '../hooks';

export default function Rooms() {
    const { offices, status: officesStatus, refetch: refetchOffices } = useOffices();
    const [requestedOfficeId, setRequestedOfficeId] = useState<string | null>(null);
    const selectedOfficeId = offices.some((office) => office.id === requestedOfficeId)
        ? requestedOfficeId
        : offices[0]?.id ?? null;
    const { rooms, status: roomsStatus, refetch: refetchRooms } = useRooms(selectedOfficeId);

    let roomsContent: ReactNode;

    if (officesStatus === 'loading') {
        roomsContent = <RoomsGrid rooms={rooms} status="loading" />;;
    } else if (officesStatus === 'error') {
        roomsContent = <ErrorOfficesState onClick={refetchOffices} />;
    } else if (!selectedOfficeId) {
        roomsContent = <OfficeNotSelectedState />;
    } else if (roomsStatus === 'error') {
        roomsContent = <ErrorRoomsState onClick={refetchRooms} />;
    } else if (roomsStatus === 'loaded' && rooms.length === 0) {
        roomsContent = <NotFoundRoomsState onClick={() => {}} />;
    } else {
        roomsContent = <RoomsGrid rooms={rooms} status={roomsStatus} />;
    }

    return (
        <>
            <OfficeSelector
                offices={offices}
                selectedOfficeId={selectedOfficeId}
                onOfficeChange={setRequestedOfficeId}
            />
            <FilterBar />
            {roomsContent}
        </>
    );
}
