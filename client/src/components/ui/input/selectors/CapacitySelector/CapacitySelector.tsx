import UsersIcon from '../../../../../assets/icons/users.svg';

import Field from '../../Field';
import Select from '../Select';

interface UserCapacity {
    id: number;
    usersCount: number;
}

const NOT_SELECTED_CAPACITY_ID = 0;
const USERS_CAPACITY: Array<UserCapacity> = [
    { id: 2, usersCount: 2 },
    { id: 4, usersCount: 4 },
    { id: 6, usersCount: 6 },
    { id: 8, usersCount: 8 },
    { id: 10, usersCount: 10 },
    { id: 12, usersCount: 12 },
];

function findCapacity(id: number): UserCapacity | undefined {
    return USERS_CAPACITY.find((capacity) => capacity.usersCount === id);
}

interface CapacitySelectorProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export default function CapacitySelector({ value, onChange }: CapacitySelectorProps) {
    const activeUserCapacityId = value ?? NOT_SELECTED_CAPACITY_ID;
    const activeCapacity = findCapacity(activeUserCapacityId);
    const capacityOptions = [
        { id: NOT_SELECTED_CAPACITY_ID, value: 'Не указано' },
        ...USERS_CAPACITY.map((capacity) => ({
            id: capacity.id,
            value: `${capacity.usersCount} чел.`,
        })),
    ];

    return (
        <Field
            label="ВМЕСТИМОСТЬ"
        >
            <Select
                id="Capacity-selector"
                leftIcon={UsersIcon}
                activeListItemId={activeUserCapacityId}
                label={activeCapacity
                    ? `Мин. ${activeCapacity.usersCount} чел.`
                    : 'Не указано'}
                list={capacityOptions}
                onSelect={(id) => onChange(id === NOT_SELECTED_CAPACITY_ID ? null : id)}
            />
        </Field>
    );
}
