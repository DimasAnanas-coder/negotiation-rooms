export function getLocalTime(timezone: string): string {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
    }).format(new Date());
}
