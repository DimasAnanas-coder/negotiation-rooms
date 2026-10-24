import httpClient from './httpClient';
import type { Room } from '../types/Rooms';

interface RoomsResponse {
    items: Room[];
}

export interface RoomsQuery {
    minCapacity?: number;
    from?: string;
    to?: string;
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
