import Skeleton from '../../../../components/ui/Skeleton';

export default function ScheduleSkeleton() {
    return (
        <div className="min-h-140 flex-1 rounded-2xl border border-primary-border bg-primary-bg p-6" aria-hidden="true">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-11 w-40 rounded-lg" />
            </div>
            <div className="mt-6 flex h-100 flex-col justify-between">
                {Array.from({ length: 10 }, (_, index) => (
                    <Skeleton key={index} className="h-px w-full" />
                ))}
            </div>
        </div>
    );
}
