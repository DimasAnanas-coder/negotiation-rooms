import { useCallback } from 'react';
import { getRoom } from '../../api/rest/rooms';
import type { RoomDetails } from '../../api/rest/rooms';
import useApi from './useApi';
import { useDataInvalidation } from '../realtime/useDataInvalidation';

export default function useRoom(roomId: string | undefined) {
    const loadRoom = useCallback(
        () => roomId ? getRoom(roomId) : Promise.resolve(null),
        [roomId],
    );
    const { data, status, error, refetch } = useApi<RoomDetails | null>(
        loadRoom,
        roomId !== undefined,
        null,
    );

    useDataInvalidation('room-details', refetch);

    return { room: data, status, error, refetch };
}
