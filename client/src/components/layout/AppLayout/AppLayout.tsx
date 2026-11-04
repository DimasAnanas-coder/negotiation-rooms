import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { useRealtimeUpdates } from '../../../hooks/realtime/useRealtimeUpdates';

export default function AppLayout() {
    useRealtimeUpdates();

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex flex-col flex-1 pt-18 ">
                <Outlet />
            </main>
        </div>
    );
}
