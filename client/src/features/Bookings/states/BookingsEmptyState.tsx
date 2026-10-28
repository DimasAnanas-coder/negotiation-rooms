import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { BaseState, IconCircle } from '../../../components/outlets/states';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import type { BookingScope } from '../../../types/Booking';

export default function BookingsEmptyState({ scope }: { scope: BookingScope }) {
    const isUpcoming = scope === 'upcoming';
    return (
        <BaseState
            visual={<IconCircle icon={CalendarIcon} color="accent" />}
            title={isUpcoming ? 'Нет предстоящих бронирований' : 'Нет прошедших бронирований'}
            description={isUpcoming
                ? 'Здесь появятся ваши забронированные переговорные.'
                : 'У вас пока нет прошедших бронирований.'}
        >
            {isUpcoming && (
                <Link to="/rooms">
                    <Button>Найти переговорную</Button>
                </Link>
            )}
        </BaseState>
    );
}
