import { useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { RoomsQuery } from '../api/rest/rooms';
import FilterBar from '../features/Rooms/layout/FilterBar';
import OfficeSelector from '../features/Rooms/layout/OfficeSelector';
import RoomsGrid from '../features/Rooms/outlets/roomsGrid';
import { parseRoomFilters, updateRoomFilterSearchParams } from '../features/Rooms/lib/roomFiltersSearchParams';
import {
    ErrorOfficesState,
    ErrorRoomsState,
    NotFoundRoomsState,
    OfficeNotSelectedState,
} from '../features/Rooms/states';
import { useOffices, useRooms } from '../hooks';
import type { RoomFilterValues } from '../features/Rooms/types';
import { getOfficeWorkdayRange } from '../utils/officeTime';

export default function Rooms() {
    const { offices, status: officesStatus, refetch: refetchOffices } = useOffices();
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedOfficeId = searchParams.get('officeId');
    const filters = useMemo(() => parseRoomFilters(searchParams), [searchParams]);
    const selectedOfficeId = offices.some(office => office.id === requestedOfficeId)
        ? requestedOfficeId
        : null;
    const selectedOffice = offices.find(office => office.id === selectedOfficeId);
    const scheduleInterval = selectedOffice
        ? getOfficeWorkdayRange(filters.date, selectedOffice.timezone)
        : null;
    const roomsQuery = useMemo<RoomsQuery>(() => {
        const query: RoomsQuery = {};
        if (filters.minCapacity !== null) {
            query.minCapacity = filters.minCapacity;
        }

        if (filters.date && filters.startTime.length === 4 && filters.durationMinutes !== null) {
            const startsAt = new Date(
                filters.date.getFullYear(),
                filters.date.getMonth(),
                filters.date.getDate(),
                Number(filters.startTime.slice(0, 2)),
                Number(filters.startTime.slice(2, 4)),
            );
            const endsAt = new Date(startsAt.getTime() + filters.durationMinutes * 60_000);
            query.from = startsAt.toISOString();
            query.to = endsAt.toISOString();
        }

        return query;
    }, [filters]);
    const { rooms, status: roomsStatus, refetch: refetchRooms } = useRooms(selectedOfficeId, roomsQuery);

    const updateFilters = (nextFilters: RoomFilterValues) => {
        setSearchParams((currentParams) => {
            return updateRoomFilterSearchParams(currentParams, nextFilters);
        }, { replace: true });
    };

    const updateOffice = (officeId: string) => {
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams);
            nextParams.set('officeId', officeId);
            return nextParams;
        }, { replace: true });
    };

    let roomsContent: ReactNode;

    if (officesStatus === 'loading') {
        roomsContent = <RoomsGrid rooms={rooms} status="loading" />;
    }
    else if (officesStatus === 'error') {
        roomsContent = <ErrorOfficesState onClick={refetchOffices} />;
    }
    else if (!selectedOfficeId) {
        roomsContent = <OfficeNotSelectedState />;
    }
    else if (roomsStatus === 'error') {
        roomsContent = <ErrorRoomsState onClick={refetchRooms} />;
    }
    else if (roomsStatus === 'loaded' && rooms.length === 0) {
        roomsContent = <NotFoundRoomsState onClick={() => {}} />;
    }
    else {
        roomsContent = (
            <RoomsGrid
                rooms={rooms}
                status={roomsStatus}
                timezone={selectedOffice?.timezone}
                scheduleInterval={scheduleInterval}
                availabilityInterval={roomsQuery.from && roomsQuery.to
                    ? { from: roomsQuery.from, to: roomsQuery.to }
                    : null}
            />
        );
    }

    return (
        <>
            <OfficeSelector
                offices={offices}
                selectedOfficeId={selectedOfficeId}
                onOfficeChange={updateOffice}
            />
            <FilterBar filters={filters} onChange={updateFilters} />
            {roomsContent}
        </>
    );
}
