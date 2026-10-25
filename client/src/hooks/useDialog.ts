import { useEffect, useRef } from 'react';

export default function useDialog() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current!;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return dialogRef;
}
