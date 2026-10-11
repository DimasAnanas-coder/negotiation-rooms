import { useState, type ReactNode } from "react";

interface InputWrapperArgs {
    leftIcon?: string;
    rightIcon?: string
    label: String
    children: ReactNode;
};



export default function InputWrapper({
    leftIcon,
    rightIcon,
    label,
    children
}: InputWrapperArgs) {
    const [isActive, setActive] = useState<boolean>(false);
    const toggleActive = () => {
        setActive(!isActive)
    }

    const intoButton = [
        leftIcon && <img src={leftIcon} className="w-4 h-4"/>,
        <p className="text-[14px]"> {label} </p>,
        rightIcon && <img src={rightIcon} className="w-4 h-4"/>,
    ]

    return (
        <div className="flex flex-col relative">
            <button 
                className="flex flex-row items-center justify-center px-3.5 py-2.5 border border-primary-border gap-2 rounded-md w-fit"
                onClick={toggleActive}
            >
                {...intoButton}
            </button>

            {isActive ? 
                <div className="border border-primary-border absolute top-full mt-1.5 z-40 rounded-xl min-w-37.5 bg-primary-bg">
                    {children} 
                </div>
            : ""}
            
            
        </div>
    );
}