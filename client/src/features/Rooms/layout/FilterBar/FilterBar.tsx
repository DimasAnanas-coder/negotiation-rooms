import Container from "../../../../components/ui/Container";
import { CapacitySelector, TimeSelector } from "../../../../components/ui/input/Select";
import { DropdownProvider } from "../../../../context/DropdownContext";

export default function FilterBar() {
    return (
        <Container className="flex flex-rows border-b border-primary-border py-4 gap-4">
            <DropdownProvider>
                <TimeSelector/>
                <CapacitySelector/>
            </DropdownProvider>
        </Container>
    );
}
    