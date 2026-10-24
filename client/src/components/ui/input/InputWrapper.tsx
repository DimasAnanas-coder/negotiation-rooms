import { type ReactNode } from 'react';
import { useDropdown } from '../../../context/DropdownContext';
import Button from '../Button';

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
    triggerClassName?: string;
    dropdownClassName?: string;
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
    triggerClassName = '',
    dropdownClassName = '',
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

    const handleButtonClick = isActive ? () => toggle(id) : () => {};
    const wrapperClassName = [
        'z-30 w-fit flex-row rounded-md bg-primary-bg',
        isBorder ? '' : '!border-0',
        isInline ? '!px-0 !py-0' : '',
        triggerClassName,
    ].filter(Boolean).join(' ');

    return (
        <div className="flex flex-col relative">
            <Button
                variant="secondary"
                className={wrapperClassName}
                onClick={handleButtonClick}
                disabled={!isActive}
                title={!isActive ? inactiveMessage : undefined}
                weight="normal"
            >
                {...intoButton}
            </Button>

            {isOpen && isDropdown
                ? (
                        <>
                            <div
                                className="fixed inset-0 z-20"
                                onClick={close}
                            />
                            <div className={`border border-primary-border absolute top-full mt-1.5 z-40 rounded-xl min-w-max bg-primary-bg ${dropdownClassName}`}>
                                {children}
                            </div>
                        </>
                    )
                : ''}

        </div>
    );
}
