import Container from "../../../../components/ui/Container";
import TimeSelector from "../../../../components/ui/input/Select/TimeSelector";

export default function FilterBar() {
    return (
        <Container className="flex flex-rows border-b border-primary-border py-5">
            <TimeSelector/>
        </Container>
    );
}
    