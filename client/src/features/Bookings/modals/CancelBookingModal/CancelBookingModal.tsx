import { useState } from 'react';
import { cancelBooking } from '../../../../api/bookings';
import type { Booking } from '../../../../types/Booking';
import { BaseModal, ModalHeader } from '../../../../components/ui/modals';
import Button from '../../../../components/ui/Button';

export default function CancelBookingModal({
    booking,
    onClose,
}: {
    booking: Booking;
    onClose: () => void;
}) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const titleId = 'cancel-booking-title';

    const confirm = async () => {
        setSaving(true);
        setError('');
        try {
            await cancelBooking(booking.id);
            window.dispatchEvent(new Event('bookings-changed'));
            onClose();
        }
        catch {
            setError('Не удалось отменить бронирование. Попробуйте ещё раз.');
        }
        finally {
            setSaving(false);
        }
    };

    return (
        <BaseModal labelledBy={titleId} onClose={onClose}>
            <ModalHeader id={titleId} title="Отменить бронирование?">
                <p className="mt-2 text-sm text-primary">
                    Бронирование «{booking.title}» в комнате «{booking.room.name}» будет отменено.
                </p>
            </ModalHeader>
            {error && <p role="alert" className="mt-4 rounded-lg bg-error-bg p-3 text-sm">{error}</p>}
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" disabled={saving} onClick={onClose}>Не отменять</Button>
                <Button variant="danger" disabled={saving} onClick={confirm}>
                    {saving ? 'Отменяем…' : 'Да, отменить'}
                </Button>
            </div>
        </BaseModal>
    );
}
