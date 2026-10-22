import BuildingIcon from '../../../assets/icons/building.svg';

import { BaseState } from "../../../components/outlets/states";


export default function OfficeNotSelectedState(){
    return (
        <BaseState
            icon={BuildingIcon}
            color="accent"
            title="Выберите офис"
            description="Для просмотра доступных переговорных сначала выберите офис из списка выше"
        />
    )
}