import Skeleton from '../../../../../components/ui/Skeleton';

export default function BookingTabSkeleton() {
    return (
        <div className="flex gap-6 border-b border-primary-border pb-3" aria-label="Загрузка вкладок" aria-busy="true">
            <Skeleton width={112} height={16} />
            <Skeleton width={72} height={16} />
        </div>
    );
}
