import Button from '../../../components/ui/Button';
import ErrorState from '../../../components/outlets/states/ErrorState';

export default function ScheduleErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <ErrorState
            title="Не удалось загрузить расписание"
            description="Произошла ошибка при загрузке расписания переговорной"
            layout='content'
        >
            <Button onClick={onRetry}>Попробовать снова</Button>
        </ErrorState>
    );
}
