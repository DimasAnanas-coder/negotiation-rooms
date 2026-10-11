import Container from "../../../../components/ui/Container";
import { CapacitySelector, TimeSelector } from "../../../../components/ui/input/Select";

export default function FilterBar() {
    return (
        <Container className="flex flex-rows border-b border-primary-border py-5 gap-4">
            <TimeSelector/>
            <CapacitySelector/>
        </Container>
    );
}
    