export default function UserProfile() {
    const firstName = "Константин";
    const lastName = "Кичибеков";

    const userInfo = `${firstName} ${lastName[0]}.`;
    const initials = `${firstName[0]}${lastName[0]}`;
    return (
        <div className="flex flex-row gap-2 items-center font-semibold">
            <p className="text-[14px] text-title">{userInfo}</p>
            <div className="flex w-10 h-10 rounded-full items-center justify-center bg-avatar-bg text-secondary">
                <p>{initials}</p>
            </div>
        </div>
    );
}