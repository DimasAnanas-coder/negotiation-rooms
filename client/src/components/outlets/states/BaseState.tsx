import type { ReactNode } from 'react';

interface BaseStateArgs {
    visual?: ReactNode;
    title: string;
    description?: string;
    children?: ReactNode;
}

export default function BaseState({ visual, title, description, children }: BaseStateArgs) {
    return (
        <div className="flex flex-col items-center mt-20 gap-6 w-full h-full">
            {visual}
            <div className='flex gap-3 flex-col items-center'>
                <p className='text-title font-extrabold text-xl'>
                    {title}
                </p>
                {description && <p className='text-sm'>{description}</p>}
            </div>
            {children}
        </div>
    );
}
