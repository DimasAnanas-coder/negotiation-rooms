import { type ReactNode } from 'react';

export default function Field({
    label,
    children,
}: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <p className="font-bold text-[11px] text-disabled">{label}</p>
            {children}
        </div>
    );
}
