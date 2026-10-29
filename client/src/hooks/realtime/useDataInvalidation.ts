import { useEffect } from 'react';
import type { DataResource } from '../../api/websocket/invalidationConfig';

const INVALIDATION_EVENT = 'data-invalidated';

export function invalidateDataResources(...resources: DataResource[]): void {
    for (const resource of new Set(resources)) {
        window.dispatchEvent(
            new CustomEvent(INVALIDATION_EVENT, { detail: { resource } }),
        );
    }
}

export function useDataInvalidation(resource: DataResource, refetch: () => void): void {
    useEffect(() => {
        const handleInvalidation = (event: Event) => {
            if (!(event instanceof CustomEvent)) return;
            if (event.detail?.resource === resource) refetch();
        };

        window.addEventListener(INVALIDATION_EVENT, handleInvalidation);
        return () => window.removeEventListener(INVALIDATION_EVENT, handleInvalidation);
    }, [resource, refetch]);
}
