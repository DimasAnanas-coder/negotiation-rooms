import httpClient from './httpClient';
import type { RoomBooking } from '../../types/Booking';
import type { Booking, BookingScope } from '../../types/Booking';

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

interface BookingsResponse {
    items: Booking[];
}

export async function getBookings(scope: BookingScope = 'upcoming', officeId?: string): Promise<Booking[]> {
    const response = await httpClient.get<BookingsResponse>('/bookings', {
        params: { scope, ...(officeId ? { officeId } : {}) },
    });
    return response.data.items;
}

export async function cancelBooking(bookingId: string): Promise<void> {
    await httpClient.delete(`/bookings/${encodeURIComponent(bookingId)}`);
}
