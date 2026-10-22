import httpClient from './httpClient';
import type { Office } from '../types/Office';

interface OfficesResponse {
    items: Office[];
}

export async function getOffices(): Promise<Office[]> {
    const response = await httpClient.get<OfficesResponse>('/offhhices');
    return response.data.items;
}
