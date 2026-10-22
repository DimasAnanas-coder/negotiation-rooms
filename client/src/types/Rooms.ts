export interface Room {
    id: string;
    officeId: string;
    name: string;
    floor: number;
    capacity: number;
    features: Array<{ code: string; name: string }>;
};

export type { RequestStatus as RoomsStatus } from './RequestStatus';
