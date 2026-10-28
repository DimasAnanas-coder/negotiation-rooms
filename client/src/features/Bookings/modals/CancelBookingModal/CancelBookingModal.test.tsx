import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { cancelBooking } from '../../../../api/bookings';
import type { Booking } from '../../../../types/Booking';
import CancelBookingModal from './CancelBookingModal';

vi.mock('../../../../api/bookings', () => ({ cancelBooking: vi.fn() }));
vi.mock('../../../../components/ui/modals', () => ({
    BaseModal: ({ children }: { children: React.ReactNode }) => <div role="dialog">{children}</div>,
    ModalHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

const booking: Booking = {
    id: 'booking-1', roomId: 'room-1', userId: 'user-1', title: 'Планирование', comment: null,
    startsAt: '2026-11-05T07:00:00.000Z', endsAt: '2026-11-05T08:00:00.000Z', createdAt: '2026-11-01T00:00:00.000Z',
    room: { id: 'room-1', officeId: 'office-1', name: 'Север', floor: 3, capacity: 8, features: [] },
    office: { id: 'office-1', name: 'Москва', address: 'Москва', timezone: 'Europe/Moscow' },
    owner: { id: 'user-1' },
};

describe('CancelBookingModal', () => {
    it('отменяет бронирование после подтверждения и обновляет список', async () => {
        vi.mocked(cancelBooking).mockResolvedValue(undefined);
        const onClose = vi.fn();
        const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
        render(<CancelBookingModal booking={booking} onClose={onClose} />);

        fireEvent.click(screen.getByRole('button', { name: 'Да, отменить' }));

        await waitFor(() => expect(cancelBooking).toHaveBeenCalledWith('booking-1'));
        expect(onClose).toHaveBeenCalledOnce();
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'bookings-changed' }));
        dispatchSpy.mockRestore();
    });

    it('оставляет диалог открытым и показывает ошибку, если отмена не удалась', async () => {
        vi.mocked(cancelBooking).mockRejectedValue(new Error('offline'));
        render(<CancelBookingModal booking={booking} onClose={vi.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: 'Да, отменить' }));

        expect(await screen.findByRole('alert')).toHaveTextContent('Не удалось отменить бронирование. Попробуйте ещё раз.');
    });
});
