import InputWrapper from '../InputWrapper';
import SelectItem from './SelectItem';
import { type ListItem, type ListItemId } from './types';

import ChevronDown from '../../../../assets/icons/chevron-down.svg';
import type { ReactNode } from 'react';

interface SelectArgs<T extends ListItemId = number> {
    id: string;
    leftIcon?: string;
    rightIcon?: string;
    onSelect: (id: T) => void;
    activeListItemId: T;
    label?: string;
    isBorder?: boolean;
    isInline?: boolean
    list: Array<ListItem<T>>;
}

export default function Select<T extends ListItemId>({
    id,
    leftIcon,
    rightIcon,
    onSelect,
    activeListItemId,
    label,
    isBorder,
    isInline,
    list,
}: SelectArgs<T>) {
    return (
        <InputWrapper
            id={id}
            leftIcon={leftIcon}
            rightIcon={rightIcon || ChevronDown}
            isBorder={isBorder}
            isInline={isInline}
            isActive={list.length > 0}
            inactiveMessage="Нет доступных вариантов"
            label={label || activeListItemId.toString()}
        >
            <div className="flex flex-col gap-1 p-2">
                {list.map((listItem: ListItem<T>): ReactNode => {
                    return (
                        <SelectItem<T>
                            key={listItem.id}
                            onSelect={onSelect}
                            listItem={listItem}
                            isActive={activeListItemId == listItem.id}
                        />
                    );
                })}
            </div>
        </InputWrapper>
    );
}
