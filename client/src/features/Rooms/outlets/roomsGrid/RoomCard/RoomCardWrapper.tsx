import type { ReactNode } from 'react';

export default function RoomCardWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col p-5 gap-4 bg-primary-bg rounded-2xl border border-primary-border">
            {children}
        </div>
    );
}
