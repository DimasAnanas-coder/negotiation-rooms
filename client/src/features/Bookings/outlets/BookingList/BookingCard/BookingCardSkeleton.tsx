import Skeleton from '../../../../../components/ui/Skeleton';

export default function BookingCardSkeleton() {
    return (
        <div className="flex h-[90px] items-center gap-4 rounded-xl border border-primary-border bg-primary-bg p-4" aria-hidden="true">
            <Skeleton width={56} height={56} />
            <div className="flex flex-1 flex-col gap-2">
                <Skeleton width={240} height={16} />
                <Skeleton width={300} height={12} />
            </div>
            <Skeleton width={80} height={32} />
        </div>
    );
}
