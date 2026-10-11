import { useContext, createContext, useState, type ReactNode } from "react";

interface DropdownContextArgs {
    openId: String | null;
    toggle: (id: String) => void;
    close: () => void;
}

const DropdownContext = createContext<DropdownContextArgs | null>(null);

export function DropdownProvider({children}: {children: ReactNode}) {
    const [openId, setOpenId] = useState<String | null>(null);
    const toggle = (id: String) => setOpenId(
        (prevId) => prevId == id ? null : id
    );
    const close = () => setOpenId(null);

    return (
        <DropdownContext.Provider value={{openId, toggle, close}}>
            {children}
        </DropdownContext.Provider>
    );
}

export function useDropdown() {
    const ctx = useContext(DropdownContext);
    if (!ctx) throw new Error("useDropdown must be used inside DropdownProvider");
    return ctx;
}
