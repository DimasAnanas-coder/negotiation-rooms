import type { Office } from '../../../../../types/Office';
import { Select } from '../../../../../components/ui/input/selectors';
import type { BookingPeriod } from '../../../types';
import BookingFilterSkeleton from './BookingFilterSkeleton';

const ALL_OFFICES_ID = 'all-offices';
const PERIOD_OPTIONS: Array<{ id: BookingPeriod; value: string }> = [
    { id: 'all', value: 'За все время' },
    { id: 'month', value: 'За месяц' },
    { id: 'week', value: 'За неделю' },
];

interface BookingFilterProps {
    offices: Office[];
    officeId: string;
    period: BookingPeriod;
    onOfficeChange: (officeId: string) => void;
    onPeriodChange: (period: BookingPeriod) => void;
    isLoading?: boolean;
}

export default function BookingFilter({
    offices,
    officeId,
    period,
    onOfficeChange,
    onPeriodChange,
    isLoading = false,
}: BookingFilterProps) {
    if (isLoading) return <BookingFilterSkeleton />;

    return (
        <div className="flex flex-wrap justify-end gap-3">
            <Select<string>
                id="bookings-office"
                label={offices.find(office => office.id === officeId)?.name ?? 'Все офисы'}
                activeListItemId={officeId || ALL_OFFICES_ID}
                onSelect={value => onOfficeChange(value === ALL_OFFICES_ID ? '' : value)}
                list={[
                    { id: ALL_OFFICES_ID, value: 'Все офисы' },
                    ...offices.map(office => ({ id: office.id, value: office.name })),
                ]}
                triggerClassName="min-w-36 justify-between"
                dropdownClassName="max-h-64 overflow-y-auto"
            />
            <Select<BookingPeriod>
                id="bookings-period"
                label={PERIOD_OPTIONS.find(option => option.id === period)?.value ?? 'За все время'}
                activeListItemId={period}
                onSelect={onPeriodChange}
                list={PERIOD_OPTIONS}
                triggerClassName="min-w-36 justify-between"
            />
        </div>
    );
}
