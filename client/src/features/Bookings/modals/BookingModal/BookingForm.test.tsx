import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { createBooking } from '../../../../api/bookings';
import type { Room } from '../../../../types/Rooms';
import { getOfficeBookingInterval } from '../../../../utils/officeTime';
import useBookingForm from '../../hooks/useBookingForm';
import BookingForm from './BookingForm';

vi.mock('../../../../api/bookings', () => ({
    createBooking: vi.fn(),
}));

vi.mock('../../../../components/ui/input/selectors/CalendarSelector', () => ({
    default: ({
        label,
        value,
        onChange,
        error,
    }: {
        label: string;
        value: Date | null;
        onChange: (value: Date | null) => void;
        error?: string;
    }) => (
        <label>
            {label}
            <input
                aria-label={label}
                type="date"
                value={value ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}` : ''}
                onChange={event => {
                    const [year, month, day] = event.target.value.split('-').map(Number);
                    onChange(event.target.value ? new Date(year, month - 1, day) : null);
                }}
            />
            {error && <p role="alert">{error}</p>}
        </label>
    ),
}));

vi.mock('../../../../components/ui/input/selectors/TimeSelector', () => ({
    default: ({
        label,
        value,
        onChange,
        error,
    }: {
        label: string;
        value: number | null;
        onChange: (value: number | null) => void;
        error?: string;
    }) => (
        <label>
            {label}
            <select
                aria-label={label}
                value={value ?? ''}
                onChange={event => onChange(event.target.value ? Number(event.target.value) : null)}
            >
                <option value="">Выберите</option>
                <option value="30">30 мин</option>
                <option value="60">1 час</option>
            </select>
            {error && <p role="alert">{error}</p>}
        </label>
    ),
}));

const room: Room = {
    id: 'room-1',
    officeId: 'office-1',
    name: 'Переговорная Север',
    floor: 3,
    capacity: 8,
    features: [],
};

const timezone = 'Europe/Moscow';
const officeDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}).format(new Date());
const [currentYear, currentMonth, currentDay] = officeDate.split('-').map(Number);
const futureDate = new Date(Date.UTC(currentYear, currentMonth - 1, currentDay + 2))
    .toISOString()
    .slice(0, 10);
const interval = getOfficeBookingInterval(futureDate, '10:00', 60, timezone);

function BookingFormHarness({ onClose = vi.fn() }: { onClose?: () => void }) {
    const form = useBookingForm({ room, timezone, interval });
    return <BookingForm form={form} onClose={onClose} />;
}

describe('BookingForm', () => {
    it('инициализирует поля из интервала и показывает сводку бронирования', () => {
        render(<BookingFormHarness />);

        expect(screen.getByLabelText('Дата')).toHaveValue(futureDate);
        expect(screen.getByLabelText('Время начала')).toHaveValue('10:00');
        expect(screen.getByLabelText('Продолжительность')).toHaveValue('60');
        expect(screen.getByText(/10:00–11:00 \(60 мин\.\)/)).toBeInTheDocument();
    });

    it('показывает ошибку обязательной темы и не отправляет запрос', async () => {
        render(<BookingFormHarness />);

        fireEvent.click(screen.getByRole('button', { name: 'Забронировать' }));

        expect(await screen.findByText('Обязательное поле')).toBeInTheDocument();
        expect(createBooking).not.toHaveBeenCalled();
    });

    it('отправляет очищенные значения и интервал бронирования', async () => {
        vi.mocked(createBooking).mockResolvedValue({} as Awaited<ReturnType<typeof createBooking>>);
        render(<BookingFormHarness />);

        fireEvent.change(screen.getByPlaceholderText('Укажите тему встречи'), {
            target: { value: '  Планирование  ' },
        });
        fireEvent.change(screen.getByPlaceholderText('Дополнительная информация для участников встречи…'), {
            target: { value: '  Обсудить план  ' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Забронировать' }));

        await waitFor(() => expect(createBooking).toHaveBeenCalledWith({
            roomId: 'room-1',
            title: 'Планирование',
            comment: 'Обсудить план',
            startsAt: interval.from,
            endsAt: interval.to,
        }));
    });

    it('блокирует поля и показывает состояние отправки, пока запрос не завершён', async () => {
        let resolveRequest!: (value: Awaited<ReturnType<typeof createBooking>>) => void;
        const request = new Promise<Awaited<ReturnType<typeof createBooking>>>((resolve) => {
            resolveRequest = resolve;
        });
        vi.mocked(createBooking).mockReturnValue(request);
        render(<BookingFormHarness />);

        fireEvent.change(screen.getByPlaceholderText('Укажите тему встречи'), {
            target: { value: 'Планирование' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Забронировать' }));

        expect(screen.getByRole('button', { name: 'Бронируем…' })).toBeDisabled();
        expect(screen.getByPlaceholderText('Укажите тему встречи')).toBeDisabled();

        resolveRequest({} as Awaited<ReturnType<typeof createBooking>>);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Забронировать' })).toBeEnabled();
        });
    });

    it('показывает сообщение, если запрос завершился ошибкой', async () => {
        vi.mocked(createBooking).mockRejectedValue(new Error('Network error'));
        render(<BookingFormHarness />);

        fireEvent.change(screen.getByPlaceholderText('Укажите тему встречи'), {
            target: { value: 'Планирование' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Забронировать' }));

        expect(await screen.findByText('Не удалось создать бронирование. Попробуйте ещё раз.'))
            .toBeInTheDocument();
    });
});
