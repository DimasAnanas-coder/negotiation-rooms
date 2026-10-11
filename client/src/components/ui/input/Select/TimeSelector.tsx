import { useState } from "react";
import Select from "./Select";
import Field from "../Field";

interface Time {
    id: Number;
    value: String;
}

const DEFAULT_TIME_ID = 4;
const TIMES: Array<Time> = [
    { id: 1, value: "15 мин" },
    { id: 2, value: "30 мин" },
    { id: 3, value: "45 мин" },
    { id: 4, value: "1 час" },
    { id: 5, value: "1 ч 15 мин" },
    { id: 6, value: "1 ч 30 мин" },
    { id: 7, value: "1 ч 45 мин" },
    { id: 8, value: "2 часа" },
]

function findTime(id: Number): Time {
    return TIMES.find((time: Time) => time.id == id) || TIMES[DEFAULT_TIME_ID];
}

export default function TimeSelector ({label}: {label?: String}) {
    const [activeTimeId, setActiveTimeId] = useState<Number>(DEFAULT_TIME_ID);
    return (
        <Field
            label={label || "ДЛИТЕЛЬНОСТЬ"}
        >
            <Select 
                onSelect={setActiveTimeId}
                label={findTime(activeTimeId).value}
                list={TIMES}
                activeListItemId={activeTimeId}
            />
        </Field>
        
    );
}