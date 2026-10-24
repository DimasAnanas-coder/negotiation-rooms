import Container from '../../../../components/ui/Container';
import { Select } from '../../../../components/ui/input/selectors';
import type { Office } from '../../../../types/Office';
import { getLocalTime } from '../../../../utils/getLocalTime';

const NOT_SELECTED_OFFICE_ID = 'not-selected';

interface OfficeSelectorArgs {
    offices: Office[];
    selectedOfficeId: string | null;
    onOfficeChange: (officeId: string) => void;
}

export default function OfficeSelector({
    offices,
    selectedOfficeId,
    onOfficeChange,
}: OfficeSelectorArgs) {
    const selectedOffice = offices.find((office) => office.id === selectedOfficeId);

    return (
        <Container className="border-b border-primary-border">
            <div className="flex flex-col h-full w-full items-start py-3 gap-1">
                <Select<string>
                    id="office-select"
                    label={selectedOffice ? `${selectedOffice.name}` : 'Выберите офис'}
                    onSelect={onOfficeChange}
                    activeListItemId={selectedOfficeId ?? NOT_SELECTED_OFFICE_ID}
                    isBorder={false}
                    isInline
                    list={offices.map((office) => ({ id: office.id, value: office.name }))}
                />

                <div className="flex flex-row text-[13px] font-medium gap-3 items-center justify-center">
                    <p>{selectedOffice ? selectedOffice.address : "Адрес не выбран"}</p>
                    <span className="w-1 h-1 bg-disabled rounded-md" />
                    <p>Местное время: { 
                        selectedOffice ? getLocalTime(selectedOffice.timezone) 
                        : "--:--"
                    }</p>
                </div>
            </div>
        </Container>
    );
}
