import Button from '../../../components/ui/Button';
import SuccessIcon from '../../../assets/icons/booking-success.svg';
import BookingSummary from '../components/BookingSummary';

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
        <section className="flex flex-col items-center py-4 text-center" aria-live="polite">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-[#DCFCE7]">
                <img src={SuccessIcon} alt="" className="size-10" />
            </div>
            <h2 id={titleId} className="text-2xl font-bold text-title">Бронирование создано</h2>
            <p className="mt-3 text-sm text-primary">Переговорная «{roomName}» забронирована для вашей встречи.</p>
            <div className="mt-6 w-full">
                <BookingSummary title={title} date={date} time={time} duration={duration} />
            </div>
            <Button className="mt-6 w-full" onClick={onClose}>Готово</Button>
        </section>
    );
}
