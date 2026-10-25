import type { ReactNode } from 'react';

interface BaseStateArgs {
    visual?: ReactNode;
    title: string;
    titleId?: string;
    description?: string;
    children?: ReactNode;
    layout?: 'content' | 'page';
}

export default function BaseState({
    visual,
    title,
    titleId,
    description,
    children,
    layout = 'content',
}: BaseStateArgs) {
    const layoutClassName = layout === 'page'
        ? 'min-h-full justify-center bg-secondary-bg px-6 py-[120px]'
        : 'mt-20 h-full';

    return (
        <div className={`flex w-full flex-col items-center gap-6 ${layoutClassName}`}>
            {visual}
            <div className="flex gap-3 flex-col items-center">
                <p id={titleId} className="text-title font-extrabold text-xl">
                    {title}
                </p>
                {description && <p className="max-w-sm text-center text-sm">{description}</p>}
            </div>
            {children}
        </div>
    );
}
