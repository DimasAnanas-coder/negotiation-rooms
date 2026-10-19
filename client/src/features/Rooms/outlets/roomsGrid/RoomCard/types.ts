import type { Room } from "../../../../../types/Rooms";

export type RoomStatus = 
    | 'loading' 
    | 'available' 
    | 'unavailable';

export interface RoomCardArgs {
    roomStatus: RoomStatus;
    room?: Room;
}