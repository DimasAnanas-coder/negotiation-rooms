import { type ListItem, type ListItemId } from './types';
import CheckIcon from '../../../../assets/icons/check.svg';
import Button from '../../Button';

interface SelectItemArgs<T extends ListItemId = number> {
    onSelect: (id: T) => void;
    listItem: ListItem<T>;
    isActive: boolean;
}

export default function SelectItem<T extends ListItemId>({
    onSelect,
    listItem,
    isActive,
}: SelectItemArgs<T>) {
    return (
        <Button
            variant="ghost"
            size="sm"
            weight="normal"
            isSelected={isActive}
            className="w-full justify-between! text-[14px]"
            onClick={() => onSelect(listItem.id)}
        >
            <span>{listItem.value}</span>
            {isActive
                ? (
                        <img
                            alt="Выбрано"
                            src={CheckIcon}
                            className="w-3 h-2.25"
                        />
                    )
                : ''}
        </Button>
    );
}
