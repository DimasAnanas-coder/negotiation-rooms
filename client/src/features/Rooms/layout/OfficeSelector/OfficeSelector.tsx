import { useMemo, useState } from 'react';
import Container from '../../../../components/ui/Container';
import Select from '../../../../components/ui/input/Select/Select';
import { getLocalTime } from '../../../../utils/getLocalTime';


export type Office = {
    id: string;
    name: string;
    address: string;
    timezone: string; // IANA, напр. 'Europe/Moscow'
    utcOffset: string; // для отображения, напр. 'MSK'
};

const OFFICES: Office[] = [
    {
        id: 'msk',
        name: 'Москва',
        address: 'ул. Лесная 7',
        timezone: 'Europe/Moscow',
        utcOffset: 'MSK',
    },
    {
        id: 'spb',
        name: 'Санкт-Петербург',
        address: 'Невский пр. 28',
        timezone: 'Europe/Moscow',
        utcOffset: 'MSK',
    },
];

const DEFAULT_OFFICE_ID = 'msk';


export default function OfficeSelector() {
    const [selectedId, setSelectedId] = useState<string>(DEFAULT_OFFICE_ID);

    const selectedOffice: Office =
        useMemo(
            () => OFFICES.find((o) => o.id === selectedId) ?? OFFICES[0],
            [selectedId],
        );

    const localTime = getLocalTime(selectedOffice.timezone);

    return (
        <Container className="border-b border-primary-border">
            <div className="flex flex-col h-full w-full items-start py-3 gap-1">
                <Select<string>
                    id="office-select"
                    label={`Офис ${selectedOffice.name}`}
                    onSelect={setSelectedId}
                    activeListItemId={selectedId}
                    isBorder={false}
                    isInline
                    list={OFFICES.map((o) => ({
                        id: o.id,
                        value: o.name,
                    }))}
                />

                <div className="flex flex-row text-[13px] font-medium gap-3 items-center justify-center">
                    <p>{selectedOffice.address}</p>
                    <span className="w-1 h-1 bg-disabled rounded-md" />
                    <p>
                        Местное время: {localTime} {selectedOffice.utcOffset}
                    </p>
                </div>
            </div>
        </Container>
    );
}