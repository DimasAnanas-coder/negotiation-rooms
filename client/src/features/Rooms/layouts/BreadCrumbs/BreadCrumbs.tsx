import { Link } from 'react-router-dom';
import ChevronRightIcon from '../../../../assets/icons/chevron-right.svg';
import BreadCrumbsSkeleton from './BreadCrumbsSkeleton';

type BreadCrumbsProps
    = | { status: 'loading' }
        | {
            status: 'active';
            officeName: string;
            roomName: string;
        };

export default function BreadCrumbs(props: BreadCrumbsProps) {
    const { status } = props;
    if (status === 'loading') {
        return <BreadCrumbsSkeleton />;
    }

    const { officeName, roomName } = props;

    const separator = (
        <img className="size-3.5" src={ChevronRightIcon} alt="" />
    );

    return (
        <nav aria-label="Хлебные крошки">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                <li>
                    <Link className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-accent" to="/rooms">
                        Переговорные
                    </Link>
                </li>
                <li className="flex items-center gap-3">
                    {separator}
                    <span>{officeName}</span>
                </li>
                <li className="flex items-center gap-3" aria-current="page">
                    {separator}
                    <span className="font-semibold text-title">Комната «{roomName}»</span>
                </li>
            </ol>
        </nav>
    );
}
