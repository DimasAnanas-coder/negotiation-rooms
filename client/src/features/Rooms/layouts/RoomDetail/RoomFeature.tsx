import usersIcon from '../../../../assets/icons/users-accent.svg'
import displayIcon from '../../../../assets/icons/tv.svg'
import videoIcon from '../../../../assets/icons/video.svg'
import whiteboardIcon from '../../../../assets/icons/edit.svg'
import checkIcon from '../../../../assets/icons/check.svg'

import type { Room } from '../../../../types/Rooms';

interface RoomFeatureProps {
    feature: Room['features'][number];
}

const iconPaths: Record<string, string> = {
    capacity: usersIcon,
    display: displayIcon,
    whiteboard: whiteboardIcon,
    video: videoIcon,
};

export default function RoomFeature({ feature }: RoomFeatureProps) {
    return (
        <li className="flex items-start gap-3">
            <img
                className="size-5 text-accent"
                src={iconPaths[feature.code] ?? checkIcon}
            />
            <span>{feature.name}</span>
        </li>
    );
}
