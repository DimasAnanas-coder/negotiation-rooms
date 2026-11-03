import Container from '../../../../components/ui/Container';
import { CalendarSelector, CapacitySelector, TimeSelector } from '../../../../components/ui/input/selectors';
import TimeInput from '../../../../components/ui/input/TimeInput';
import type { RoomFilterValues } from '../../types';

interface FilterBarProps {
    filters: RoomFilterValues;
    onChange: (filters: RoomFilterValues) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
    return (
        <Container className="grid grid-cols-2 md:flex md:flex-row border-b border-primary-border py-4 gap-4">
            <CalendarSelector
                value={filters.date}
                onChange={(date) => onChange({ ...filters, date })}
            />
            <TimeInput
                value={filters.startTime}
                onChange={(startTime) => onChange({ ...filters, startTime })}
            />
            <TimeSelector
                value={filters.durationMinutes}
                onChange={(durationMinutes) => onChange({ ...filters, durationMinutes })}
            />
            <CapacitySelector
                value={filters.minCapacity}
                onChange={(minCapacity) => onChange({ ...filters, minCapacity })}
            />
        </Container>
    );
}
