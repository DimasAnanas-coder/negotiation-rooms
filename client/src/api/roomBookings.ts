import httpClient from './httpClient';
import type { RoomBooking } from '../types/Booking';

interface RoomBookingsResponse {
    items: RoomBooking[];
}

export interface RoomBookingsQuery {
    from: string;
    to: string;
}

export async function getRoomBookings(
    roomId: string,
    query: RoomBookingsQuery,
): Promise<RoomBooking[]> {
    const response = await httpClient.get<RoomBookingsResponse>(
        `/rooms/${encodeURIComponent(roomId)}/bookings`,
        { params: query },
    );

    return response.data.items;
}
