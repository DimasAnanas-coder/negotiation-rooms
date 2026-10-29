import httpClient from './httpClient';
import type { Room } from '../../types/Rooms';
import type { Office } from '../../types/Office';

interface RoomsResponse {
    items: Room[];
}

export interface RoomsQuery {
    minCapacity?: number;
    from?: string;
    to?: string;
}

export interface RoomDetails extends Room {
    office: Office;
}

export async function getRoom(roomId: string): Promise<RoomDetails> {
    const response = await httpClient.get<RoomDetails>(`/rooms/${encodeURIComponent(roomId)}`);
    return response.data;
}

export async function getRooms(officeId: string, query: RoomsQuery = {}): Promise<Room[]> {
    const response = await httpClient.get<RoomsResponse>('/rooms', {
        params: {
            officeId,
            ...(query.minCapacity === undefined ? {} : { minCapacity: query.minCapacity }),
            ...(query.from === undefined ? {} : { from: query.from }),
            ...(query.to === undefined ? {} : { to: query.to }),
        },
    });
    return response.data.items;
}
