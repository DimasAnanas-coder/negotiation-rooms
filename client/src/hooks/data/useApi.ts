import { useCallback, useEffect, useState } from 'react';
import type { RequestStatus } from '../../types/RequestStatus';

interface UseApiResult<T> {
    data: T;
    status: RequestStatus;
    error: unknown | null;
    refetch: () => void;
}

export default function useApi<T>(
    request: () => Promise<T>,
    enabled: boolean,
    initialData: T,
): UseApiResult<T> {
    const [data, setData] = useState<T>(() => initialData);
    const [status, setStatus] = useState<RequestStatus>('loading');
    const [error, setError] = useState<unknown | null>(null);
    const [requestVersion, setRequestVersion] = useState(0);

    const refetch = useCallback(() => {
        setRequestVersion((version) => version + 1);
    }, []);

    useEffect(() => {
        let isCurrentRequest = true;

        if (!enabled) {
            setData(initialData);
            setError(null); 
            setStatus('loaded');
            return () => {
                isCurrentRequest = false;
            };
        }

        setData(initialData);
        setError(null);
        setStatus('loading');

        const load = async () => {
            try {
                const result = await request();
                if (!isCurrentRequest) return;
                setData(result);
                setStatus('loaded');
            } catch (requestError: unknown) {
                if (!isCurrentRequest) return;
                console.error('API request failed:', requestError);
                setError(requestError);
                setStatus('error');
            }
        };

        load();

        return () => {
            isCurrentRequest = false;
        };
    }, [enabled, initialData, request, requestVersion]);

    return { data, status, error, refetch };
}
