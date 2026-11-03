import type { ReactNode } from 'react';


export interface BaseStateArgs {
    visual?: ReactNode;
    title?: string;
    titleId?: string;
    description?: string;
    children?: ReactNode;
    layout?: 'content' | 'page';
}

