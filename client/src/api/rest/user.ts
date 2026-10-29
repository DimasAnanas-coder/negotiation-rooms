import httpClient from './httpClient';
import type { User } from '../../types/User';

export async function getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/me');
    return response.data;
}
