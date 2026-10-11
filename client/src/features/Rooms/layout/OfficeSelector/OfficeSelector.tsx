import Container from "../../../../components/ui/Container";
import SelectorTrigger from "./SelectorTrigger";

export default function OfficeSelector() {
    const office = {
        name: "Москва",
        adress: "ул. Лесная 7"
    }
    const nowMskTime = "14:35"

    return (
        <Container className="border-b border-primary-border">
            <div className="flex flex-col h-full w-full items-start py-4 gap-1">
                <SelectorTrigger 
                    officeName={office.name}
                />
                <div className="flex flex-row text-[13px] font-medium gap-3 items-center justify-center">
                    <p>{office.adress}</p>
                    <ellipse 
                        className="w-1 h-1 bg-disabled rounded-md"
                    />
                    <p>Местное время: {nowMskTime} MSK</p>
                </div>
            </div>
        </Container>
    )
}