import { type HTMLAttributes } from 'react';

type SkeletonVariant = 'rect' | 'circle';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
}

const variantClasses: Record<SkeletonVariant, string> = {
    rect:   'rounded-md',
    circle: 'rounded-full',
};

export function Skeleton({
    variant = 'rect',
    width,
    height,
    className = '',
    ...props
}: SkeletonProps) {
    const base = 'animate-pulse bg-skeleton-bg';

    return (
        <div
            className={`${base} ${variantClasses[variant]} ${className}`}
            style={{ width, height }}
            {...props}
        />
    );
}