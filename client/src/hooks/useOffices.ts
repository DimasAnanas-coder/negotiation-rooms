import { getOffices } from '../api/offices';
import type { Office } from '../types/Office';
import useApi from './useApi';

const EMPTY_OFFICES: Office[] = [];

export default function useOffices() {
    const { data, status, error, refetch } = useApi(getOffices, true, EMPTY_OFFICES);

    return {
        offices: status === 'loaded' ? data : EMPTY_OFFICES,
        status,
        error,
        refetch,
    };
}
