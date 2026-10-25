import Skeleton from '../../../../components/ui/Skeleton';

export default function RoomDetailSkeleton() {
    return (
        <div className="flex w-full flex-col gap-5 rounded-2xl border border-primary-border bg-primary-bg p-6 lg:w-105" aria-hidden="true">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-56" />
            <div className="flex flex-col gap-4 border-t border-primary-border pt-5">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-52" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-56" />
            </div>
        </div>
    );
}
