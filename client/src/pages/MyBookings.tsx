import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Booking, BookingScope } from '../types/Booking';
import type { BookingPeriod } from '../features/Bookings/types';
import { useOffices } from '../hooks';
import Container from '../components/ui/Container';
import MyBookingsLayout from '../features/Bookings/layout/MyBookingsLayout';
import BookingList from '../features/Bookings/outlets/BookingList';
import useMyBookings from '../features/Bookings/hooks/useMyBookings';
import BookingsEmptyState from '../features/Bookings/states/BookingsEmptyState';
import BookingsErrorState from '../features/Bookings/states/BookingsErrorState';
import CancelBookingModal from '../features/Bookings/modals/CancelBookingModal';

const PAGE_LOAD_TIME = Date.now();

function readScope(value: string | null): BookingScope {
    return value === 'past' ? 'past' : 'upcoming';
}

export default function MyBookings() {
    const [searchParams] = useSearchParams();
    const scope = readScope(searchParams.get('scope'));
    const [officeId, setOfficeId] = useState('');
    const [period, setPeriod] = useState<BookingPeriod>('all');
    const { offices, status: officesStatus } = useOffices();
    const { bookings, status, refetch } = useMyBookings(scope, officeId || undefined);
    const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
    const visibleBookings = useMemo(() => {
        if (period === 'all') return bookings;
        const days = period === 'week' ? 7 : 30;
        const offset = days * 24 * 60 * 60 * 1000;
        const threshold = scope === 'past' ? PAGE_LOAD_TIME - offset : PAGE_LOAD_TIME + offset;
        return bookings.filter(booking => scope === 'past'
            ? Date.parse(booking.startsAt) >= threshold
            : Date.parse(booking.startsAt) <= threshold);
    }, [bookings, period, scope]);

    return (
        <div className="min-h-full bg-secondary-bg py-8">
            <Container className="mx-auto flex w-full flex-col gap-6 px-6">
                <MyBookingsLayout
                    offices={offices}
                    officeId={officeId}
                    period={period}
                    activeScope={scope}
                    upcomingCount={scope === 'upcoming' ? visibleBookings.length : undefined}
                    isLoadingOffices={officesStatus === 'loading'}
                    isLoadingBookings={status === 'loading'}
                    onOfficeChange={setOfficeId}
                    onPeriodChange={setPeriod}
                />

                {status === 'error' && <BookingsErrorState onRetry={refetch} />}
                {status === 'loaded' && visibleBookings.length === 0 && <BookingsEmptyState scope={scope} />}
                {(status === 'loading' || visibleBookings.length > 0) && (
                    <BookingList
                        bookings={visibleBookings}
                        status={status}
                        scope={scope}
                        onCancel={setBookingToCancel}
                    />
                )}
            </Container>

            {bookingToCancel && (
                <CancelBookingModal booking={bookingToCancel} onClose={() => setBookingToCancel(null)} />
            )}
        </div>
    );
}
