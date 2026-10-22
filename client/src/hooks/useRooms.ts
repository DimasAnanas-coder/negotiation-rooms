import { useCallback } from 'react';
import { getRooms } from '../api/rooms';
import type { Room } from '../types/Rooms';
import useApi from './useApi';

const EMPTY_ROOMS: Room[] = [];

export default function useRooms(officeId: string | null) {
    const loadRooms = useCallback(() => {
        if (!officeId) return Promise.resolve(EMPTY_ROOMS);
        return getRooms(officeId);
    }, [officeId]);

    const { data, status, error, refetch } = useApi(
        loadRooms,
        officeId !== null,
        EMPTY_ROOMS,
    );

    return { rooms: data, status, error, refetch };
}
