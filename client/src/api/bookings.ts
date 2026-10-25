import httpClient from './httpClient';
import type { RoomBooking } from '../types/Booking';

export interface CreateBooking {
    roomId: string;
    title: string;
    comment: string;
    startsAt: string;
    endsAt: string;
}

export async function createBooking(input: CreateBooking): Promise<RoomBooking> {
    const response = await httpClient.post<RoomBooking>('/bookings', input);
    return response.data;
}
