import Select from '../Select';
import Field from '../../Field';

interface Time {
    id: number;
    value: string;
}

const NOT_SELECTED_TIME_ID = 0;
const TIMES: Array<Time> = [
    { id: NOT_SELECTED_TIME_ID, value: 'Выберите' },
    { id: 15, value: '15 мин' },
    { id: 30, value: '30 мин' },
    { id: 45, value: '45 мин' },
    { id: 60, value: '1 час' },
    { id: 75, value: '1 ч 15 мин' },
    { id: 90, value: '1 ч 30 мин' },
    { id: 105, value: '1 ч 45 мин' },
    { id: 120, value: '2 часа' },
];

function findTime(id: number): Time {
    return TIMES.find((time: Time) => time.id === id) || TIMES[0];
}

interface TimeSelectorProps {
    label?: string;
    value: number | null;
    onChange: (value: number | null) => void;
}

export default function TimeSelector({ label, value, onChange }: TimeSelectorProps) {
    const activeTimeId = value ?? NOT_SELECTED_TIME_ID;
    return (
        <Field
            label={label || 'ДЛИТЕЛЬНОСТЬ'}
        >
            <Select
                id="Time-selector"
                onSelect={(id) => onChange(id === NOT_SELECTED_TIME_ID ? null : id)}
                label={findTime(activeTimeId).value}
                list={TIMES}
                activeListItemId={activeTimeId}
            />
        </Field>

    );
}
