import HomeIcon from '../assets/icons/home.svg';
import { BaseState, DisplayText } from '../components/outlets/states';
import { ButtonLink } from '../components/ui/Button';

export default function NotFoundPage() {
    return (
        <BaseState
            layout="page"
            visual={<DisplayText>404</DisplayText>}
            title="Страница не найдена"
            description="Запрашиваемая страница не существует, была удалена или перенесена на другой адрес."
        >
            <ButtonLink to="/rooms" size="lg">
                <img src={HomeIcon} className="size-4" alt="" />
                Вернуться к переговорным
            </ButtonLink>
        </BaseState>
    );
}
