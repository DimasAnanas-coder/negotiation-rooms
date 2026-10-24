import { ErrorState } from "../../../components/outlets/states";
import Button from '../../../components/ui/Button';


export default function ErrorOfficesState({
    onClick
}: {
    onClick: () => void;
}){
    return (
        <ErrorState
            description="Произошла ошибка при загрузке списка офисов"
        >
            <Button variant="primary" size="lg" onClick={onClick}>
                Попробовать снова
            </Button>
        </ErrorState>
    );
}
