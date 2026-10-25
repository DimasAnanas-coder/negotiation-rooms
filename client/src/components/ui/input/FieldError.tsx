interface FieldErrorProps {
    id: string;
    message?: string;
}

export default function FieldError({ id, message }: FieldErrorProps) {
    if (!message) return null;

    return <p id={id} role="alert" className="text-sm font-medium text-error">{message}</p>;
}
