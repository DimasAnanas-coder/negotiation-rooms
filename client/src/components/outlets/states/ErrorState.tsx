import type { ReactNode } from 'react';
import AlertTriangleIcon from '../../../assets/icons/alert-triangle.svg';
import BaseState from './BaseState';
import { IconCircle } from './visuals';

interface ErrorStateArgs {
    title?: string;
    description?: string;
    children?: ReactNode;
}

export default function ErrorState({
    title = 'Не удалось загрузить данные',
    description = 'Ошибка обрела чудовищные обороты',
    children,
}: ErrorStateArgs) {
    return (
        <BaseState
            visual={<IconCircle icon={AlertTriangleIcon} color="red" />}
            title={title}
            description={description}
        >
            {children}
        </BaseState>
    );
}
