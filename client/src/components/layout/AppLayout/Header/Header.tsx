import Container from '../../../ui/Container';

import Brand from './Brand';
import NavLink from './NavLink';
import UserProfile from './UserProfile';

import { type NavRoutes } from './types';

const routes: NavRoutes = [
    { to: '/rooms', name: 'Переговорные', default: true },
    { to: '/bookings', name: 'Мои бронирования' },
];

export default function Header() {
    return (
        <header className="flex min-h-18 items-center border-b border-primary-border fixed top-0 bg-primary-bg w-full h-18 z-50">
            <Container className="w-full h-full">
                <div className="flex justify-between items-center h-full gap-2">
                    <Brand />

                    <nav className="flex flex-row gap-4 font-medium h-full">
                        {routes.map(route => (
                            <NavLink key={route.to} to={route.to}>
                                <p className='text-center text-[14px] md:text-[15px]'>{route.name}</p>
                            </NavLink>
                        ))}
                    </nav>

                    <UserProfile />
                </div>
            </Container>
        </header>
    );
}
