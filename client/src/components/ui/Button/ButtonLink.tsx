import { Link, type LinkProps } from 'react-router-dom';
import { getButtonClassName, type ButtonStyleProps } from './Button';

interface ButtonLinkProps extends Omit<LinkProps, 'className'>, Omit<ButtonStyleProps, 'disabled'> {
    className?: string;
}

export default function ButtonLink({
    variant,
    size,
    weight,
    isSelected,
    className = '',
    children,
    ...linkProps
}: ButtonLinkProps) {
    return (
        <Link
            {...linkProps}
            className={getButtonClassName({ variant, size, weight, isSelected, className })}
        >
            {children}
        </Link>
    );
}
