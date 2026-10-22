import httpClient from './httpClient';
import type { Room } from '../types/Rooms';

interface RoomsResponse {
    items: Room[];
}

export async function getRooms(officeId: string): Promise<Room[]> {
    const response = await httpClient.get<RoomsResponse>('/rooms', {
        params: { officeId },
    });
    return response.data.items;
}
