import { config } from '../../config';
import { isRealtimeEvent, type RealtimeEvent } from './events';

export function connectWebSocket(onEvent: (event: RealtimeEvent) => void): () => void {
    const socket = new WebSocket(config.websocketUrl);

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
