import { useId } from 'react';
import { BaseModal, ModalHeader } from '../../../../components/ui/modals';
import BookingSuccessState from '../../states/BookingSuccessState';
import useBookingForm from '../../hooks/useBookingForm';
import type { BookingOptions } from '../../types';
import BookingForm from './BookingForm';
import { DropdownProvider } from '../../../../context/DropdownContext';
import { invalidateDataResources } from '../../../../hooks/realtime/useDataInvalidation';

interface BookingModalProps extends BookingOptions {
    onClose: () => void;
}

export default function BookingModal({ onClose, ...bookingOptions }: BookingModalProps) {
    const titleId = useId();
    const form = useBookingForm(bookingOptions);
    const { room } = bookingOptions;

    const close = () => {
        if (form.isPending()) return;
        onClose();
        if (form.success) invalidateDataResources('rooms', 'room-schedule', 'my-bookings');
    };

    return (
        <DropdownProvider>
            <BaseModal labelledBy={titleId} onClose={close} className="max-w-[640px]! max-h-[calc(100dvh-2rem)]! sm:p-7!">
                {form.success
                    ? (
                            <BookingSuccessState
                                titleId={titleId}
                                roomName={room.name}
                                onClose={close}
                            />
                        )
                    : (
                            <>
                                <ModalHeader id={titleId} title="Новое бронирование">
                                    <p className="mt-2 border-b border-primary-border pb-5 text-sm text-primary">
                                        Переговорная: <span className="font-bold text-accent">{room.name}</span> ({room.floor} этаж)
                                    </p>
                                </ModalHeader>
                                <BookingForm form={form} onClose={close} />
                            </>
                        )}
            </BaseModal>
        </DropdownProvider>
    );
}
