import { useCallback, useEffect } from 'react';
import { getRooms, type RoomsQuery } from '../api/rooms';
import type { Room } from '../types/Rooms';
import useApi from './useApi';

const EMPTY_ROOMS: Room[] = [];

export default function useRooms(officeId: string | null, query: RoomsQuery = {}) {
    const { minCapacity, from, to } = query;
    const loadRooms = useCallback(() => {
        if (!officeId) return Promise.resolve(EMPTY_ROOMS);
        return getRooms(officeId, { minCapacity, from, to });
    }, [officeId, minCapacity, from, to]);

    const { data, status, error, refetch } = useApi(
        loadRooms,
        officeId !== null,
        EMPTY_ROOMS,
    );

    useEffect(() => {
        window.addEventListener('bookings-changed', refetch);
        return () => window.removeEventListener('bookings-changed', refetch);
    }, [refetch]);

    return { rooms: data, status, error, refetch };
}
