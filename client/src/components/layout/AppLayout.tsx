import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useRealtimeUpdates } from '../../hooks/realtime/useRealtimeUpdates';

export default function AppLayout() {
    useRealtimeUpdates();

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
