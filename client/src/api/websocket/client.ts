import { isRealtimeEvent, type RealtimeEvent } from './events';

function getWebSocketUrl(): string {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1';
    const url = new URL(apiBaseUrl);

    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = `${url.pathname.replace(/\/$/, '')}/ws`;
    url.search = '';
    url.hash = '';

    return url.toString();
}

export function connectWebSocket(onEvent: (event: RealtimeEvent) => void): () => void {
    const socket = new WebSocket(getWebSocketUrl());

    socket.addEventListener('message', (message: MessageEvent<unknown>) => {
        if (typeof message.data !== 'string') return;

        let event: unknown;
        try {
            event = JSON.parse(message.data);
        } catch {
            console.error('Не удалось прочитать событие WebSocket');
            return;
        }

        if (isRealtimeEvent(event)) onEvent(event);
    });

    return () => socket.close();
}
