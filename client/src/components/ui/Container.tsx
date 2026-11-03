export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`mx-auto px-4 xl:px-10 lg:px-9 md:px-8 sm:px-6 xs:px-5 ${className || ''}`}>
            {children}
        </div>
    );
}
