import { useContext, createContext, useState, type ReactNode } from 'react';

interface DropdownContextArgs {
    openId: string | null;
    toggle: (id: string) => void;
    close: () => void;
}

const DropdownContext = createContext<DropdownContextArgs | null>(null);

export function DropdownProvider({ children }: { children: ReactNode }) {
    const [openId, setOpenId] = useState<string | null>(null);
    const toggle = (id: string) => setOpenId(
        prevId => prevId == id ? null : id,
    );
    const close = () => setOpenId(null);

    return (
        <DropdownContext.Provider value={{ openId, toggle, close }}>
            {children}
        </DropdownContext.Provider>
    );
}

export function useDropdown() {
    const ctx = useContext(DropdownContext);
    if (!ctx) throw new Error('useDropdown must be used inside DropdownProvider');
    return ctx;
}
