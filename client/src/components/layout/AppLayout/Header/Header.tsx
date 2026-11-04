import Container from '../../../ui/Container';

import Brand from './Brand';
import NavBar from './NavBar';
import UserProfile from './UserProfile';


export default function Header() {
    return (
        <header className="flex min-h-18 items-center border-b border-primary-border fixed top-0 bg-primary-bg w-full h-18 z-50">
            <Container className="flex w-full h-full justify-between items-center gap-2">
                <Brand />
                <NavBar />
                <UserProfile />
            </Container>
        </header>
    );
}
