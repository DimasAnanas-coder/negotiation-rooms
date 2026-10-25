import { useId, type ReactNode } from 'react';
import FieldError from './FieldError';

export default function Field({
    label,
    children,
    labelClassName = 'font-bold text-[11px] text-disabled',
    error,
    errorId,
}: { label: string; children: ReactNode; labelClassName?: string; error?: string; errorId?: string }) {
    const generatedErrorId = useId();
    return (
        <div className="flex flex-col gap-1.5">
            <p className={labelClassName}>{label}</p>
            {children}
            <FieldError id={errorId ?? generatedErrorId} message={error} />
        </div>
    );
}
