import Logo from "../../assets/icons/logo-badge.svg";

const ServiceName = "BookRoom";

export default function Brand() {
    return (
        <div className="flex flex-row items-center">
            <img 
                src={Logo}
                alt="Negotiation Rooms Logo"
                className="w-9 h-9"  
            />
            <h1 className="text-title font-bold text-[20px] ml-2 text-center font-extrabold">{ServiceName}</h1>
        </div>
    )
}