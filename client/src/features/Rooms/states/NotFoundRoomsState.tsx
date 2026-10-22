import SearchXIcon from '../../../assets/icons/search-x.svg';

import { BaseState } from "../../../components/outlets/states";


export default function NotFoundRoomsState({
    onClick
}: {
    onClick: () => void;
}){
    return (
        <BaseState
            icon={SearchXIcon}
            color="gray"
            title="Нет доступных переговорных"
            description="Попробуйте изменить параметры фильтрации или выбрать другой офис"
            buttonLabel='Сбросить фильтры'
            onClick={onClick}
        />
    )
}