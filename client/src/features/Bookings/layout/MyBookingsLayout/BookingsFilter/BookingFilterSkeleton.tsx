import Skeleton from '../../../../../components/ui/Skeleton';

export default function BookingFilterSkeleton() {
    return (
        <div className="flex gap-3" aria-label="Загрузка фильтров" aria-busy="true">
            <Skeleton width={112} height={40} />
            <Skeleton width={128} height={40} />
        </div>
    );
}
