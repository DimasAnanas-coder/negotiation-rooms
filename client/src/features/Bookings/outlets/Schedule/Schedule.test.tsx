import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Room } from '../../../../types/Rooms';
import type { RoomBooking } from '../../../../types/Booking';
import { useCurrentUser, useRoomBookings } from '../../../../hooks';
import Schedule from './Schedule';

vi.mock('../../../../hooks', () => ({
    useCurrentUser: vi.fn(),
    useRoomBookings: vi.fn(),
}));

vi.mock('../../../../components/ui/input/selectors/CalendarSelector/CalendarSelector', () => ({
    default: () => <button type="button">Выбрать дату</button>,
}));

vi.mock('../../components/BookingButton', () => ({
    default: ({ label }: { label: string }) => <button type="button">{label}</button>,
}));

const room: Room = {
    id: 'room-1', officeId: 'office-1', name: 'Переговорная Север', floor: 3, capacity: 8, features: [],
};

const bookings: RoomBooking[] = [
    {
        id: 'own', roomId: room.id, userId: 'user-1', title: 'Планирование', comment: null, createdAt: '',
        startsAt: '2026-11-05T07:00:00.000Z', endsAt: '2026-11-05T08:00:00.000Z',
    },
    {
        id: 'other', roomId: room.id, userId: 'user-2', title: 'Секретная встреча', comment: null, createdAt: '',
        startsAt: '2026-11-05T08:00:00.000Z', endsAt: '2026-11-05T08:30:00.000Z',
    },
];

describe('Schedule', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-11-05T12:00:00.000Z'));
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it('показывает название собственной встречи, а чужую скрывает', () => {
        vi.mocked(useRoomBookings).mockReturnValue({ bookings, status: 'loaded', error: null, refetch: vi.fn() });
        vi.mocked(useCurrentUser).mockReturnValue({
            user: { id: 'user-1' }, status: 'loaded', error: null, refetch: vi.fn(),
        });

        render(<Schedule status="active" room={room} timezone="Europe/Moscow" />);

        expect(screen.getByRole('article', { name: 'Планирование, 10:00–11:00' })).toBeInTheDocument();
        expect(screen.getByRole('article', { name: 'Занято, 11:00–11:30' })).toBeInTheDocument();
        expect(screen.queryByText('Секретная встреча')).not.toBeInTheDocument();
    });
});
