import { useState } from 'react';
import UsersIcon from '../../../../../assets/icons/users.svg';

import Field from '../../Field';
import Select from '../Select';

interface UserCapacity {
    id: number;
    usersCount: number;
}

const DEFAULT_USER_CAPACITY_ID = 1;
const USERS_CAPACITY: Array<UserCapacity> = [
    { id: 1, usersCount: 2 },
    { id: 2, usersCount: 4 },
    { id: 3, usersCount: 6 },
    { id: 4, usersCount: 8 },
    { id: 5, usersCount: 10 },
    { id: 6, usersCount: 12 },
];

function findCapacity(id: number): UserCapacity {
    return USERS_CAPACITY.find((capacity: UserCapacity) => capacity.id == id) || USERS_CAPACITY[DEFAULT_USER_CAPACITY_ID];
}

export default function CapacitySelector() {
    const [activeUserCapacityId, setActiveUserCapacityId] = useState<number>(DEFAULT_USER_CAPACITY_ID);

    return (
        <Field
            label="ВМЕСТИМОСТЬ"
        >
            <Select
                id="Capacity-selector"
                leftIcon={UsersIcon}
                activeListItemId={activeUserCapacityId}
                label={`Мин. ${findCapacity(activeUserCapacityId).usersCount} чел.`}
                list={USERS_CAPACITY.map((userCapacity: UserCapacity) => {
                    return { id: userCapacity.id, value: `${userCapacity.usersCount} чел.` };
                })}
                onSelect={setActiveUserCapacityId}
            />
        </Field>
    );
}
