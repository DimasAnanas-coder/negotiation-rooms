import type { Office } from './Office';
import type { Room } from './Rooms';
import type { User } from './User';

export interface RoomBooking {
    id: string;
    roomId: string;
    userId: string;
    title: string;
    comment: string | null;
    startsAt: string;
    endsAt: string;
    createdAt: string;
}

export interface Booking extends RoomBooking {
    room: Room;
    office: Office;
    owner: User;
}

export type BookingScope = 'upcoming' | 'past' | 'all';
