import { Navigate, type RouteObject } from 'react-router-dom'
// import Layout from './components/Layout';
import Rooms from './pages/Rooms'

export const routes: RouteObject[] = [
    {
        path: '/',
        // element: <Layout />,
        children: [
            { index: true, element: <Navigate to="/rooms" replace /> },
            { path: 'rooms', element: <Rooms /> },
        ],
    },
]
