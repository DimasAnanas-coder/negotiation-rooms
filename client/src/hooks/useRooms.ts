import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Room, RoomsStatus } from '../types/Rooms';

interface RoomsResponse {
    items: Array<{
        id: string;
        name: string;
        floor: number;
        capacity: number;
    }>;
}

async function fetchRooms(): Promise<Array<Room>> {
    const response = await axios.get<RoomsResponse>(
        'http://localhost:3000/api/v1/rooms', {
            params: { officeId: 'office-moscow' },
        },
    );
    console.log(response.data);

    return response.data.items.map((data) => {
        return {
            id: data.id,
            name: data.name,
            floor: data.floor,
            capacity: data.capacity,
        };
    });
}

const DEFAULT_ROOMS_BEFORE_LOADING: Array<Room | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
];

export default function useRooms() {
    const [rooms, setRooms] = useState<Array<Room | undefined>>(DEFAULT_ROOMS_BEFORE_LOADING);
    const [loading, setLoading] = useState<RoomsStatus>('loading');

    useEffect(() => {
        fetchRooms().then((data) => {
            setRooms(data);
            setLoading('loaded');
        });
    }, []);

    return { rooms, setRooms, loading };
}
