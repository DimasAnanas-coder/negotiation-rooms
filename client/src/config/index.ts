import { env } from './env';

function createWebSocketUrl(apiBaseUrl: string): string {
    const url = new URL(apiBaseUrl);

    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = `${url.pathname.replace(/\/$/, '')}/ws`;
    url.search = '';
    url.hash = '';

    return url.toString();
}

export const config = {
    apiUrl: env.apiBaseUrl,
    websocketUrl: createWebSocketUrl(env.apiBaseUrl),
};
