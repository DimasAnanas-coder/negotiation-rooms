export const realtimeEventTypes = [
    'booking.created',
    'booking.cancelled',
    'room.availability_changed',
    'data.reset',
] as const;

export type RealtimeEventType = (typeof realtimeEventTypes)[number];

export interface RealtimeEvent {
    type: RealtimeEventType;
    occurredAt: string;
    data: Record<string, unknown>;
}

export function isRealtimeEvent(value: unknown): value is RealtimeEvent {
    if (typeof value !== 'object' || value === null) return false;

    const event = value as Record<string, unknown>;
    return typeof event.type === 'string'
        && realtimeEventTypes.includes(event.type as RealtimeEventType)
        && typeof event.occurredAt === 'string'
        && typeof event.data === 'object'
        && event.data !== null
        && !Array.isArray(event.data);
}
