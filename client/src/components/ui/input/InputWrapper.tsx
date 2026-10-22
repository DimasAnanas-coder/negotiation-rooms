import { type ReactNode } from 'react';
import { useDropdown } from '../../../context/DropdownContext';

interface InputWrapperArgs {
    id: string;
    leftIcon?: string;
    rightIcon?: string;
    label?: string;
    isDropdown?: boolean;
    isBorder?: boolean;
    isInline?: boolean;
    isActive?: boolean;
    inactiveMessage?: string;
    children: ReactNode;
};

export default function InputWrapper({
    id,
    leftIcon,
    rightIcon,
    label,
    isDropdown = true,
    isBorder = true,
    isInline = false,
    isActive = true,
    inactiveMessage,
    children,
}: InputWrapperArgs) {
    const { openId, toggle, close } = useDropdown();
    const isOpen = openId === id;

    const inlineButtonSettings = isInline ? "font-bold text-lg" : "text-sm";
    const intoButton = [
        leftIcon && <img src={leftIcon} className="w-4 h-4" />,
        isDropdown
            ? (
                    <p className={`text-title ${inlineButtonSettings}`}>
                        {label || ''}
                    </p>
                )
            : children,
        rightIcon && <img src={rightIcon} className="w-4 h-4" />,
    ];

    const pointerSettings = !isActive
        ? "cursor-not-allowed"
        : isDropdown
            ? "cursor-pointer"
            : "";
    const baseClassName = "flex flex-row items-center z-30 justify-center gap-2 rounded-md w-fit bg-primary-bg";
    const inlineSettings = isInline ? "" : "px-3.5 py-2.5";
    const borderSettings = isBorder ? "border border-primary-border" : "";
    const resultClassName = `${baseClassName} ${borderSettings} ${inlineSettings} ${pointerSettings}`;
    const handleButtonClick = isActive ? () => toggle(id) : () => {};

    return (
        <div className="flex flex-col relative">
            <button
                className={resultClassName}
                onClick={handleButtonClick}
                title={!isActive ? inactiveMessage : undefined}
            >
                {...intoButton}
            </button>

            {isOpen && isDropdown
                ? (
                        <>
                            <div
                                className="fixed inset-0 z-20"
                                onClick={close}
                            />
                            <div className="border border-primary-border absolute top-full mt-1.5 z-40 rounded-xl min-w-45 bg-primary-bg">
                                {children}
                            </div>
                        </>
                    )
                : ''}

        </div>
    );
}
