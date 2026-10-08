export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`mx-auto px-10 ${className || ''}`}>
            {children}
        </div>
    )
}