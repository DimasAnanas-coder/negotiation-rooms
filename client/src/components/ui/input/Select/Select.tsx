import InputWrapper from '../InputWrapper';
import SelectItem from './SelectItem';
import { type ListItem } from './types';

import ChevronDown from '../../../../assets/icons/chevron-down.svg';

interface SelectArgs {
    id: string;
    leftIcon?: string;
    rightIcon?: string;
    onSelect: (id: number) => void;
    activeListItemId: number;
    label?: string;
    list: Array<ListItem>;
}

export default function Select({
    id,
    leftIcon,
    rightIcon,
    onSelect,
    activeListItemId,
    label,
    list,
}: SelectArgs) {
    return (
        <InputWrapper
            id={id}
            leftIcon={leftIcon}
            rightIcon={rightIcon || ChevronDown}
            label={label || activeListItemId.toString()}
        >
            <div className="flex flex-col gap-1 p-2">
                {list.map((listItem: ListItem) => (
                    <SelectItem
                        onSelect={onSelect}
                        listItem={listItem}
                        isActive={activeListItemId == listItem.id}
                    />
                ),
                )}
            </div>
        </InputWrapper>
    );
}
