import { ErrorState } from "../../../components/outlets/states";


export default function ErrorRoomsState({
    onClick
}: {
    onClick: () => void;
}){
    return (
        <ErrorState
            description="Произошла ошибка при загрузке списка переговорных"
            onClick={onClick}
        />
    )
}