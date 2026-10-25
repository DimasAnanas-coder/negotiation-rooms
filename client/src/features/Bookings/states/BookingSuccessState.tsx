import Button from '../../../components/ui/Button';
import SuccessIcon from '../../../assets/icons/booking-success.svg';
import { BaseState, IconCircle } from '../../../components/outlets/states';

interface BookingSuccessStateProps {
    titleId: string;
    roomName: string;
    title: string;
    date: string;
    time: string;
    duration: number;
    onClose: () => void;
}

export default function BookingSuccessState({ titleId, roomName, title, date, time, duration, onClose }: BookingSuccessStateProps) {
    return (
        <div aria-live="polite">
            <BaseState
                visual={<IconCircle icon={SuccessIcon} color="accent" />}
                title="Бронирование создано"
                titleId={titleId}
                description={`Переговорная «${roomName}» забронирована для вашей встречи.`}
            >
                <Button className="w-full" onClick={onClose}>Готово</Button>
            </BaseState>
        </div>
    );
}
