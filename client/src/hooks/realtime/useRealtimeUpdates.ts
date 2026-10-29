import { useEffect } from 'react';
import { connectWebSocket } from '../../api/websocket/client';
import { realtimeInvalidations } from '../../api/websocket/invalidationConfig';
import { invalidateDataResources } from './useDataInvalidation';

export function useRealtimeUpdates(): void {
    useEffect(() => connectWebSocket((event) => {
        invalidateDataResources(...realtimeInvalidations[event.type]);
    }), []);
}

