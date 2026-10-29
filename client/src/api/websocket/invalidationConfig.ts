import type { RealtimeEventType } from './events';

export type DataResource =
    | 'rooms'
    | 'room-schedule'
    | 'my-bookings'
    | 'room-details';

export const realtimeInvalidations: Record<RealtimeEventType, readonly DataResource[]> = {
    'booking.created': ['my-bookings'],
    'booking.cancelled': ['my-bookings'],
    'room.availability_changed': ['rooms', 'room-schedule'],
    'data.reset': ['rooms', 'room-schedule', 'my-bookings', 'room-details'],
};
