import { describe, expect, it, vi } from 'vitest';
import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useRoomBookings } from '../../../../../hooks';
import type { Room } from '../../../../../types/Rooms';
import RoomCard from './RoomCard';

vi.mock('../../../../../hooks', () => ({
    useRoomBookings: vi.fn(),
}));

vi.mock('../../../../Bookings/components/BookingButton', () => ({
    default: ({ disabled, label }: { disabled?: boolean; label: string }) => (
        <button type="button" disabled={disabled}>{label}</button>
    ),
}));

const room: Room = {
    id: 'room/one',
    officeId: 'office-1',
    name: 'Переговорная Север',
    floor: 3,
    capacity: 8,
    features: [],
};

function renderRoomCard(props: Partial<ComponentProps<typeof RoomCard>> = {}) {
    vi.mocked(useRoomBookings).mockReturnValue({
        bookings: [],
        status: 'loaded',
        error: null,
        refetch: vi.fn(),
    });

    return render(
        <MemoryRouter>
            <RoomCard room={room} roomStatus="available" timezone="Europe/Moscow" {...props} />
        </MemoryRouter>,
    );
}

describe('RoomCard', () => {
    it('показывает скелетон во время загрузки', () => {
        renderRoomCard({ roomStatus: 'loading' });

        expect(screen.queryByText(room.name)).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Подробнее' })).not.toBeInTheDocument();
    });

    it('показывает скелетон, если комната ещё не загружена', () => {
        renderRoomCard({ room: undefined });

        expect(screen.queryByText(room.name)).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Подробнее' })).not.toBeInTheDocument();
    });

    it('показывает информацию о комнате и ссылку на её страницу', () => {
        renderRoomCard();

        expect(screen.getByText(room.name)).toBeInTheDocument();
        expect(screen.getByText('3 этаж')).toBeInTheDocument();
        expect(screen.getByText('Вместимость: до 8 человек')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Подробнее' }))
            .toHaveAttribute('href', '/rooms/room%2Fone');
    });

    it.each([
        ['available', 'Доступно на выбранное время', false],
        ['unavailable', 'Недоступно на выбранное время', true],
        ['not-selected', 'Укажите дату и время', false],
    ] as const)('для статуса %s показывает доступность и состояние бронирования', (roomStatus, label, disabled) => {
        renderRoomCard({ roomStatus });

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Забронировать' })).toHaveProperty('disabled', disabled);
    });

    it('не показывает кнопку бронирования, если часовой пояс не задан', () => {
        renderRoomCard({ timezone: undefined });

        expect(screen.queryByRole('button', { name: 'Забронировать' })).not.toBeInTheDocument();
    });

    it('показывает состояние загрузки расписания', () => {
        vi.mocked(useRoomBookings).mockReturnValue({
            bookings: [],
            status: 'loading',
            error: null,
            refetch: vi.fn(),
        });

        render(
            <MemoryRouter>
                <RoomCard room={room} roomStatus="unavailable" timezone="Europe/Moscow" />
            </MemoryRouter>,
        );

        expect(screen.getByText('Занята до --:--')).toBeInTheDocument();
    });

    it('показывает ошибку, если расписание не загрузилось', () => {
        vi.mocked(useRoomBookings).mockReturnValue({
            bookings: [],
            status: 'error',
            error: new Error('Network error'),
            refetch: vi.fn(),
        });

        render(
            <MemoryRouter>
                <RoomCard room={room} roomStatus="available" timezone="Europe/Moscow" />
            </MemoryRouter>,
        );

        expect(screen.getByText('Не удалось загрузить расписание')).toBeInTheDocument();
    });
});
