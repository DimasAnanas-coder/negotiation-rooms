import Container from "../ui/Container";

export default function Header() {
    return (
        <header className="bg-blue-500 text-white h-20 flex items-center">
            <Container>
                <p className="text-2xl font-bold">Negotiation Rooms</p>
            </Container>
        </header>
    )
}