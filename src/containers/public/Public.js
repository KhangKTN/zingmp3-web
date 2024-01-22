import { Outlet } from "react-router-dom"
import { Player, SidebarLeft, SidebarRight } from "../../components"

const Public = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full h-full flex flex-auto bg-primary">
                <div className="w-[240px] min-h-full flex-none bg-sidebar">
                    <SidebarLeft/>
                </div>
                <div className="flex-auto">
                    <Outlet/>
                </div>
                <div className="w-[100px] wide:block hidden wide:animate-slide-left flex-none bg-sidebar">
                    <SidebarRight/>
                </div>
            </div>
            <div className="flex-none h-[90px] bg-player">
                <Player/>
            </div>
        </div>
    )
}

export default Public