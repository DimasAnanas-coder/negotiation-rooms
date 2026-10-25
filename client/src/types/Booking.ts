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
