import { useState } from 'react';
import FilterBar from '../features/Rooms/layout/FilterBar';
import OfficeSelector from '../features/Rooms/layout/OfficeSelector';
import RoomsGrid from '../features/Rooms/outlets/roomsGrid';
import useOffices from '../hooks/useOffices';

export default function Rooms() {
    const { offices } = useOffices();
    const [requestedOfficeId, setRequestedOfficeId] = useState<string | null>(null);
    const selectedOfficeId = offices.some((office) => office.id === requestedOfficeId)
        ? requestedOfficeId
        : offices[0]?.id ?? null;

    return (
        <>
            <OfficeSelector offices={offices} selectedOfficeId={selectedOfficeId}
                onOfficeChange={setRequestedOfficeId} />
            <FilterBar />
            <RoomsGrid officeId={selectedOfficeId} />
        </>
    );
}
