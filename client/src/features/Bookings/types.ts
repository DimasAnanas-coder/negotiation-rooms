import type { Room } from '../../types/Rooms';
import type { UtcInterval } from '../../utils/officeTime';

export interface BookingOptions {
    room: Room;
    timezone: string;
    interval?: UtcInterval | null;
}

export type BookingPeriod = 'all' | 'month' | 'week';
