import { Link } from 'react-router-dom';
import type { BookingScope } from '../../../../../types/Booking';
import BookingTabSkeleton from './BookingTabSkeleton';

const tabs: Array<{ scope: BookingScope; label: string }> = [
    { scope: 'upcoming', label: 'Предстоящие' },
    { scope: 'past', label: 'Прошедшие' },
];

export default function BookingTab({
    activeScope,
    upcomingCount,
    isLoading = false,
}: {
    activeScope: BookingScope;
    upcomingCount?: number;
    isLoading?: boolean;
}) {
    if (isLoading) return <BookingTabSkeleton />;

    return (
        <nav aria-label="Тип бронирований" className="flex gap-6 border-b border-primary-border">
            {tabs.map(tab => (
                <Link
                    key={tab.scope}
                    to={`/bookings?scope=${tab.scope}`}
                    aria-current={activeScope === tab.scope ? 'page' : undefined}
                    className={`-mb-px border-b-2 px-1 pb-3 text-sm font-semibold ${activeScope === tab.scope
                        ? 'border-accent-border text-accent'
                        : 'border-transparent text-disabled hover:text-primary'}`}
                >
                    {tab.label}{tab.scope === 'upcoming' && upcomingCount !== undefined ? ` (${upcomingCount})` : ''}
                </Link>
            ))}
        </nav>
    );
}
