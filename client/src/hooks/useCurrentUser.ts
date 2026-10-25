import { useCallback } from 'react';
import { getCurrentUser } from '../api/user';
import type { User } from '../types/User';
import useApi from './useApi';

export default function useCurrentUser() {
    const loadUser = useCallback(() => getCurrentUser(), []);
    const { data, status, error, refetch } = useApi<User | null>(loadUser, true, null);

    return { user: data, status, error, refetch };
}
