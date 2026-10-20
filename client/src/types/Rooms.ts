export interface Room {
    id: string;
    name: string;
    floor: number;
    capacity: number;
};

export type RoomsStatus = 'loading' | 'loaded';
