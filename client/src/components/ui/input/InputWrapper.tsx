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

    const baseClassName = "flex flex-row items-center z-30 justify-center py-2.5 gap-2 rounded-md w-fit bg-primary-bg";
    const inlineSettings = isInline ? "" : "px-3.5";
    const borderSettings = isBorder ? "border border-primary-border" : "";
    const resultClassName = `${baseClassName} ${borderSettings} ${inlineSettings}`;

    return (
        <div className="flex flex-col relative">
            <button
                className={resultClassName}
                onClick={() => toggle(id)}
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
