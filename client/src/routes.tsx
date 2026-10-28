import { Navigate, type RouteObject } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Rooms from './pages/Rooms';
import Room from './pages/Room';
import MyBookings from './pages/MyBookings';
import NotFoundPage from './pages/NotFoundPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <Navigate to="/rooms" replace /> },
            { path: 'rooms', element: <Rooms /> },
            { path: 'rooms/:roomId', element: <Room /> },
            { path: 'bookings', element: <MyBookings /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
];
