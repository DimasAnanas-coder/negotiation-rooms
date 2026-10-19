import Skeleton from "../../../../../components/ui/Skeleton";
import RoomCardWrapper from "./RoomCardWrapper";


export default function RoomCardSkeleton(){
    const lineWithCircle = <div className="flex flex-row gap-2">
        <Skeleton width={16} height={16} variant="circle"/>
        <Skeleton width={200} height={16} />
    </div>

    const rect = <Skeleton width="100%" height={36}/>;

    return (
        <RoomCardWrapper>
            <div className="flex flex-col gap-1">
                <Skeleton width={120} height={25} />
                <Skeleton width={50} height={18} />
            </div>

            <div className="flex flex-col gap-2">
                {lineWithCircle}
                {lineWithCircle}
            </div>

            {rect}

            <div className="flex flex-row gap-3">
                {rect}
                {rect}
            </div>
        </RoomCardWrapper>
    );
}