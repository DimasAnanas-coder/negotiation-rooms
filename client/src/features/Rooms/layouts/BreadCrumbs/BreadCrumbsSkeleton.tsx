import Skeleton from '../../../../components/ui/Skeleton';

export default function BreadCrumbsSkeleton() {
    return (
        <div className="flex h-5 items-center gap-3" aria-hidden="true">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3.5 w-3.5" variant="circle" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3.5 w-3.5" variant="circle" />
            <Skeleton className="h-4 w-36" />
        </div>
    );
}
