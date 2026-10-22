import Button from '../../../../../components/ui/Button';
import type { RoomCardArgs } from './types';

export default function ReserveBookButton({
    roomStatus,
    room,
}: RoomCardArgs) {
    const handleReserve = () => {
        alert(`Резервация ${room?.name}`);
    };

    return (
        <Button
            variant="primary"
            disabled={roomStatus !== 'available'}
            onClick={handleReserve}
        >
            Забронировать
        </Button>
    );
}
