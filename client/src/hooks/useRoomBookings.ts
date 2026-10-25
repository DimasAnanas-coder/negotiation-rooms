import { useCallback } from 'react';
import { getRoomBookings, type RoomBookingsQuery } from '../api/roomBookings';
import type { RoomBooking } from '../types/Booking';
import useApi from './useApi';

const EMPTY_BOOKINGS: RoomBooking[] = [];

export default function useRoomBookings(
    roomId: string | null,
    query: RoomBookingsQuery | null,
) {
    const from = query?.from;
    const to = query?.to;
    const loadBookings = useCallback(() => {
        if (!roomId || !from || !to) return Promise.resolve(EMPTY_BOOKINGS);
        return getRoomBookings(roomId, { from, to });
    }, [roomId, from, to]);

    const { data, status, error, refetch } = useApi(
        loadBookings,
        roomId !== null && from !== undefined && to !== undefined,
        EMPTY_BOOKINGS,
    );

    return {
        bookings: data,
        status,
        error,
        refetch,
    };
}
