import { type ListItem } from "./types"
import CheckIcon from "../../../../assets/icons/check.svg";

interface SelectItemArgs {
    onSelect: (id: Number) => void;
    listItem: ListItem;
    isActive: boolean;
}


export default function SelectItem({
    onSelect,
    listItem,
    isActive,
}: SelectItemArgs) {
    return (
        <button 
            className={
                `flex rounded-md justify-between items-center text-title px-3 py-2 ${isActive ? "bg-highlight-bg" : ""}`
            }
            onClick={() => onSelect(listItem.id)}
        >
            <p className="text-[14px]">{listItem.value}</p>
            {isActive ? <img 
                src={CheckIcon}
                className="w-3 h-2.25"
            /> : ""}
        </button>
    )
}