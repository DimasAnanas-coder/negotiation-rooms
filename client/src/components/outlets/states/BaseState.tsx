import AlertTriangleIcon from '../../../assets/icons/alert-triangle.svg';


type Color = "gray" | "accent" | "red";

const colorBg: Record<Color, string> = {
    "gray": "bg-disabled-bg",
    "accent": "bg-highlight-bg",
    "red": "bg-error-bg",
}

interface BaseStateArgs {
    color?: Color;
    title?: string;
    description?: string;
    icon: string;
    buttonLabel?: string;
    onClick?: () => void;
}


export default function BaseState({
    color="red",
    title="Ошибка",
    description="Все, это конец",
    icon=AlertTriangleIcon,
    buttonLabel="",
    onClick,
}: BaseStateArgs){
    return (
        <div className="flex flex-col items-center mt-20 gap-6 w-full h-full">
            <div className={`flex justify-center items-center w-30 h-30 ${colorBg[color]} rounded-full`}>
                <img 
                    src={icon}
                    className='w-14 h-14'
                />
            </div>
            <div className='flex gap-3 flex-col items-center'>
                <p className='text-title font-extrabold text-xl'>
                    {title}
                </p>
                <p className='text-sm'>
                    {description}
                </p>
            </div>
            <button
                className='flex px-6 py-3 bg-active-bg rounded-xl cursor-pointer'
                onClick={onClick}
            >
                <p className='text-secondary text-sm font-bold'>{buttonLabel}</p>
            </button>
        </div>
    );
}