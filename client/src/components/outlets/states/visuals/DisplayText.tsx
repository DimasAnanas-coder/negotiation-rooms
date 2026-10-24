import type { ReactNode } from 'react';

interface DisplayTextProps {
    children: ReactNode;
}

export default function DisplayText({ children }: DisplayTextProps) {
    return (
        <p className="text-8xl leading-none font-extrabold text-accent">
            {children}
        </p>
    );
}
