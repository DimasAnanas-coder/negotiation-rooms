import AlertTriangleIcon from '../../../assets/icons/alert-triangle.svg';

import BaseState from "./BaseState";
import type { CustomStateArgs } from "./types";


export default function ErrorState({
    title="Не удалось загрузить данные",
    description="Ошибка обрела чудовищные обороты",
    buttonLabel="Попробовать снова",
    onClick,
}: CustomStateArgs){
    return (
        <BaseState
            color="red"
            icon={AlertTriangleIcon}
            title={title}
            description={description}
            buttonLabel={buttonLabel}
            onClick={onClick}
        />
    )
}