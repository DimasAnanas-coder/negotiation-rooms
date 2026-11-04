import NavLink from './NavLink';
import { type NavRoutes } from './types';

const routes: NavRoutes = [
    { to: '/rooms', name: 'Переговорные', default: true },
    { to: '/bookings', name: 'Мои бронирования' },
];

export default function NavBar() {
    return (
        <nav className="flex flex-row gap-4 font-medium h-full">
            {routes.map(route => (
                <NavLink key={route.to} to={route.to}>
                    <p className='text-center text-[14px] md:text-[15px]'>{route.name}</p>
                </NavLink>
            ))}
        </nav>
    )
    
}