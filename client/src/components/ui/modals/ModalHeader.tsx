import type { ReactNode } from 'react';

interface ModalHeaderProps {
    id: string;
    title: string;
    children?: ReactNode;
}

export default function ModalHeader({ id, title, children }: ModalHeaderProps) {
    return (
        <header>
            <h2 id={id} className="text-2xl font-bold">{title}</h2>
            {children}
        </header>
    );
}
