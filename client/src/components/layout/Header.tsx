import Container from "../ui/Container";

import Brand from "./Brand";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

import { type NavRoutes } from "./types";

const routes: NavRoutes = [
    { to: "/rooms", name: "Переговорные", default: true },
    { to: "/bookings", name: "Мои бронирования" }
]


export default function Header() {
    return (
        <header className="h-20 flex items-center border-b border-primary-border">
            <Container className="w-full h-full">
                <div className="flex justify-between items-center h-full">
                    <Brand />

                    <nav className="flex flex-row gap-4 text-[15px] font-medium h-full">
                        {routes.map((route) => (
                            <NavLink key={route.to} to={route.to}>
                                {route.name}
                            </NavLink>
                        ))}
                    </nav>

                    <UserProfile />
                </div>
            </Container>
        </header>
    )
}