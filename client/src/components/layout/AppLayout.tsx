import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function AppLayout() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}