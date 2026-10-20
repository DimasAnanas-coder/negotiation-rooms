import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { DropdownProvider } from './context/DropdownContext';

function AppRoutes() {
    const element = useRoutes(routes);
    return element;
}

export default function App() {
    return (
        <BrowserRouter>
            <DropdownProvider>
                <AppRoutes />
            </DropdownProvider>
        </BrowserRouter>
    );
}
