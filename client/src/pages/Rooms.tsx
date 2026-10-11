import Container from '../components/ui/Container';
import FilterBar from '../features/Rooms/layout/FilterBar';
import OfficeSelector from '../features/Rooms/layout/OfficeSelector';

export default function Rooms() {
    return (
        <>
            <OfficeSelector />
            <FilterBar />
            <Container>
                <h1 className="text-4xl text-blue-500 font-bold">Rooms Page</h1>
                <p className="mt-4 text-lg">This is the Rooms page.</p>
            </Container>
        </>
    );
}
