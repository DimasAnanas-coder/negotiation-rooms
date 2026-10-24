import { ErrorState } from "../../../components/outlets/states";
import Button from '../../../components/ui/Button';


export default function ErrorRoomsState({
    onClick
}: {
    onClick: () => void;
}){
    return (
        <ErrorState
            description="Произошла ошибка при загрузке списка переговорных"
        >
            <Button variant="primary" size="lg" onClick={onClick}>
                Попробовать снова
            </Button>
        </ErrorState>
    );
}
