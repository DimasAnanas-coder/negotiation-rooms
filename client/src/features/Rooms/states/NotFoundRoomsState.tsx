import SearchXIcon from '../../../assets/icons/search-x.svg';
import Button from '../../../components/ui/Button';
import { BaseState, IconCircle } from '../../../components/outlets/states';


export default function NotFoundRoomsState({
    onClick
}: {
    onClick: () => void;
}){
    return (
        <BaseState
            visual={<IconCircle icon={SearchXIcon} color="gray" />}
            title="Нет доступных переговорных"
            description="Попробуйте изменить параметры фильтрации или выбрать другой офис"
        >
            <Button variant="primary" size="lg" onClick={onClick}>
                Сбросить фильтры
            </Button>
        </BaseState>
    );
}
