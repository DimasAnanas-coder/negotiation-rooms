import FilterBar from '../features/Rooms/layout/FilterBar';
import OfficeSelector from '../features/Rooms/layout/OfficeSelector';
import RoomsGrid from '../features/Rooms/outlets/roomsGrid';

export default function Rooms() {
    return (
        <>
            <OfficeSelector />
            <FilterBar />
            <RoomsGrid />
        </>
    );
}
