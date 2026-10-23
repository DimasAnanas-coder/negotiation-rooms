import Container from '../../../../components/ui/Container';
import { CalendarSelector, CapacitySelector, TimeSelector } from '../../../../components/ui/input/selectors';
import TimeInput from '../../../../components/ui/input/TimeInput';

export default function FilterBar() {
    return (
        <Container className="flex flex-rows border-b border-primary-border py-4 gap-4">
            <CalendarSelector />
            <TimeInput />
            <TimeSelector />
            <CapacitySelector />
        </Container>
    );
}
