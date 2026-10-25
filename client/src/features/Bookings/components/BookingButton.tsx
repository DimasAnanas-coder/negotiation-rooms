import Button from '../../../components/ui/Button';
import useModal from '../../../hooks/useModal';
import BookingModal from '../modals/BookingModal';
import type { BookingOptions } from '../types';

interface BookingButtonProps extends BookingOptions {
    label: string;
    disabled?: boolean;
}

export default function BookingButton({ label, disabled, ...bookingOptions }: BookingButtonProps) {
    const modal = useModal();

    return (
        <>
            <Button disabled={disabled} onClick={modal.open}>{label}</Button>
            {modal.isOpen && <BookingModal {...bookingOptions} onClose={modal.close} />}
        </>
    );
}
