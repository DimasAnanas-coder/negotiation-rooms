import { ErrorState } from "../../../components/outlets/states";


export default function ErrorOfficesState({
    onClick
}: {
    onClick: () => void;
}){
    return (
        <ErrorState
            description="Произошла ошибка при загрузке списка офисов"
            onClick={onClick}
        />
    )
}