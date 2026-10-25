interface BookingSummaryProps {
    title: string;
    date: string;
    time: string;
    duration: number;
}

export default function BookingSummary({ title, date, time, duration }: BookingSummaryProps) {
    return (
        <p role="status" className="rounded-lg bg-highlight-bg p-4">
            {title.trim()} · {date}, {time} · {duration} мин.
        </p>
    );
}
