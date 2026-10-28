import type { BookingScope } from '../../../../types/Booking';
import type { Office } from '../../../../types/Office';
import type { BookingPeriod } from '../../types';
import BookingFilter from './BookingsFilter';
import BookingTab from './BookingsTab';

interface MyBookingsLayoutProps {
    offices: Office[];
    officeId: string;
    period: BookingPeriod;
    activeScope: BookingScope;
    upcomingCount?: number;
    isLoadingOffices: boolean;
    isLoadingBookings: boolean;
    onOfficeChange: (officeId: string) => void;
    onPeriodChange: (period: BookingPeriod) => void;
}

export default function MyBookingsLayout({
    offices,
    officeId,
    period,
    activeScope,
    upcomingCount,
    isLoadingOffices,
    isLoadingBookings,
    onOfficeChange,
    onPeriodChange,
}: MyBookingsLayoutProps) {
    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-title">Мои бронирования</h1>
                <BookingFilter
                    offices={offices}
                    officeId={officeId}
                    period={period}
                    onOfficeChange={onOfficeChange}
                    onPeriodChange={onPeriodChange}
                    isLoading={isLoadingOffices}
                />
            </header>
            <BookingTab
                activeScope={activeScope}
                upcomingCount={upcomingCount}
                isLoading={isLoadingBookings}
            />
        </div>
    );
}
