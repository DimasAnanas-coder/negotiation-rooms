import type { ReactNode } from 'react';
import useDialog from '../../../hooks/useDialog';

interface BaseModalProps {
    labelledBy: string;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export default function BaseModal({ labelledBy, onClose, children, className = '' }: BaseModalProps) {
    const dialogRef = useDialog();

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={labelledBy}
            className={`fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl bg-primary-bg p-6 text-title shadow-xl backdrop:bg-[#0F172A]/60 sm:p-8 ${className}`}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            {children}
        </dialog>
    );
}
