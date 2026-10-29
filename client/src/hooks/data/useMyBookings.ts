import { useCallback } from 'react';
import { getBookings } from '../../api/rest/bookings';
import type { Booking, BookingScope } from '../../types/Booking';
import useApi from './useApi';
import { useDataInvalidation } from '../realtime/useDataInvalidation';

const EMPTY_BOOKINGS: Booking[] = [];

export default function useMyBookings(scope: BookingScope, officeId?: string) {
    const loadBookings = useCallback(() => getBookings(scope, officeId), [scope, officeId]);
    const { data, status, error, refetch } = useApi(loadBookings, true, EMPTY_BOOKINGS);
    useDataInvalidation('my-bookings', refetch);

    return { bookings: data, status, error, refetch };
}
