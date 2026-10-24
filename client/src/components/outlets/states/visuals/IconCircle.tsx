type IconCircleColor = 'gray' | 'accent' | 'red';

const colorBackground: Record<IconCircleColor, string> = {
    gray: 'bg-disabled-bg',
    accent: 'bg-highlight-bg',
    red: 'bg-error-bg',
};

interface IconCircleProps {
    icon: string;
    color?: IconCircleColor;
}

export default function IconCircle({ icon, color = 'red' }: IconCircleProps) {
    return (
        <div className={`flex size-30 items-center justify-center rounded-full ${colorBackground[color]}`}>
            <img src={icon} className="size-14" alt="" />
        </div>
    );
}
