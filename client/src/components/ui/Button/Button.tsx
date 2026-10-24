import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    weight?: ButtonWeight;
    isSelected?: boolean;
}

export interface ButtonStyleProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    weight?: ButtonWeight;
    isSelected?: boolean;
    disabled?: boolean;
    className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: 'bg-active-bg text-secondary hover:brightness-95 disabled:bg-disabled-bg disabled:text-disabled',
    secondary: 'border border-primary-border bg-primary-bg text-title hover:bg-secondary-bg disabled:hover:bg-primary-bg',
    ghost: 'bg-transparent text-title disabled:opacity-60',
    danger: 'bg-error-bg text-title hover:brightness-95 disabled:opacity-60',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
    sm: 'rounded-md px-3 py-2 text-xs',
    md: 'rounded-lg px-4 py-2.5 text-sm',
    lg: 'rounded-xl px-6 py-3 text-sm',
};

const WEIGHT_CLASSES: Record<ButtonWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

export function getButtonClassName({
    variant = 'primary',
    size = 'md',
    weight = 'semibold',
    isSelected = false,
    disabled = false,
    className = '',
}: ButtonStyleProps) {
    const variantClassName = variant === 'ghost' && isSelected
        ? 'bg-highlight-bg text-title'
        : VARIANT_CLASSES[variant];

    return [
        'inline-flex items-center justify-center gap-2 transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'disabled:cursor-not-allowed',
        variantClassName,
        SIZE_CLASSES[size],
        WEIGHT_CLASSES[weight],
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
    ].filter(Boolean).join(' ');
}

export default function Button({
    variant = 'primary',
    size = 'md',
    weight = 'semibold',
    isSelected = false,
    type = 'button',
    disabled = false,
    className = '',
    children,
    ...buttonProps
}: ButtonProps) {
    const classes = getButtonClassName({ variant, size, weight, isSelected, disabled, className });

    return (
        <button
            {...buttonProps}
            type={type}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
}
