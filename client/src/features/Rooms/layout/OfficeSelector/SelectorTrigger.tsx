import ChevronDown from "../../../../assets/icons/chevron-down.svg";


export default function SelectorTrigger({officeName}: {officeName: string}) {
    return (
        <div className="flex flex-row items-center gap-2">
            <p className="text-title font-bold text-[18px]">Офис {officeName}</p>
            <img
                src={ChevronDown}
                alt="Chevron Down"
                className="w-4 h-4"
            />
        </div>
    )
}
