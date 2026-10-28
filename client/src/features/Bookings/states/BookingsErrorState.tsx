import Button from '../../../components/ui/Button';
import ErrorState from '../../../components/outlets/states/ErrorState';

export default function BookingsErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <ErrorState
            title="Не удалось загрузить бронирования"
            description="Попробуйте загрузить список ещё раз."
        >
            <Button onClick={onRetry}>Повторить</Button>
        </ErrorState>
    );
}
