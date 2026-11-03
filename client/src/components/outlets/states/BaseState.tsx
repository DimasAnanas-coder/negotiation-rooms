import type { BaseStateArgs } from "./types";


export default function BaseState({
    visual,
    title,
    titleId,
    description,
    children,
    layout = 'page',
}: BaseStateArgs) {
    const layoutClassName = layout === 'page'
        ? 'bg-secondary-bg'
        : 'bg-primary-bg border border-disabled-bg rounded-lg p-6';

    return (
        <div className={`flex flex-1 w-full flex-col items-center justify-center gap-6 ${layoutClassName}`}>
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
