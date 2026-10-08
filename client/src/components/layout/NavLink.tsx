import { Link, useLocation } from 'react-router-dom';



export default function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`flex items-center ${isActive ? "text-accent border-b-2 border-accent-border" : ""}`}>
            {children}
        </Link>
    )
}