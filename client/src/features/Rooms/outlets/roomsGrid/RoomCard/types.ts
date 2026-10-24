import type { Room } from '../../../../../types/Rooms';

export type RoomStatus
    = | 'loading'
        | 'available'
        | 'unavailable'
        | 'not-selected';

export interface RoomCardArgs {
    roomStatus: RoomStatus;
    room?: Room;
}
