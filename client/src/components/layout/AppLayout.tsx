import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from "../ui/Container";


export default function AppLayout() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </div>
    )
}