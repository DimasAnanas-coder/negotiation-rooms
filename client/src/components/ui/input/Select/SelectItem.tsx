import { type ListItem, type ListItemId } from './types';
import CheckIcon from '../../../../assets/icons/check.svg';

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
        <button
            className={
                `flex rounded-md justify-between items-center text-title px-3 py-2 ${isActive ? 'bg-highlight-bg' : ''} cursor-pointer`
            }
            onClick={() => onSelect(listItem.id)}
        >
            <p className="text-[14px]">{listItem.value}</p>
            {isActive
                ? (
                        <img
                            src={CheckIcon}
                            className="w-3 h-2.25"
                        />
                    )
                : ''}
        </button>
    );
}
