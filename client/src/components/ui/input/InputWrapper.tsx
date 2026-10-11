import { useState, type ReactNode } from "react";
import { useDropdown } from "../../../context/DropdownContext";

interface InputWrapperArgs {
    id: String;
    leftIcon?: string;
    rightIcon?: string
    label: String
    children: ReactNode;
};



export default function InputWrapper({
    id,
    leftIcon,
    rightIcon,
    label,
    children
}: InputWrapperArgs) {
    const { openId, toggle, close } = useDropdown();
    const isOpen = openId === id;

    const intoButton = [
        leftIcon && <img src={leftIcon} className="w-4 h-4"/>,
        <p className="text-[14px]"> {label} </p>,
        rightIcon && <img src={rightIcon} className="w-4 h-4"/>,
    ]

    return (
        <div className="flex flex-col relative">
            <button 
                className="flex flex-row items-center z-40 justify-center px-3.5 py-2.5 border border-primary-border gap-2 rounded-md w-fit"
                onClick={() => toggle(id)}
            >
                {...intoButton}
            </button>

            {isOpen ? 
                <>
                    <div 
                        className="fixed inset-0 z-20"
                        onClick={close}
                    />
                    <div className="border border-primary-border absolute top-full mt-1.5 z-30 rounded-xl min-w-37.5 bg-primary-bg">
                        {children} 
                    </div>
                </>
            : ""}
            
            
        </div>
    );
}