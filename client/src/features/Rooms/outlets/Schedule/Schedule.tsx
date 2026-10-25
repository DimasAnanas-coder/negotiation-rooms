import ScheduleSkeleton from './ScheduleSkeleton';

interface ScheduleProps {
    status: 'active' | 'loading';
}

export default function Schedule({ status }: ScheduleProps) {
    if (status === 'loading') {
        return <ScheduleSkeleton />;
    }

    return <div className="min-h-160 flex-1" />;
}
