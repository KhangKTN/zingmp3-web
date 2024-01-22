import { icons } from "../ultis/icon"
import Search from "./Search"

const { PiArrowLeftThin, PiArrowRightThin } = icons

const Header = () => {
    return (
        <div className="flex items-center h-full w-full justify-between backdrop-blur gap-3">
            <div className="flex items-center gap-6 w-[70%]">
                <div className="flex gap-6">
                    <PiArrowLeftThin className="size-6 hover:text-cyan-500 cursor-pointer"/>
                    <PiArrowRightThin className="size-6"/>
                </div>
                <div className="flex-1">
                    <Search/>
                </div>
            </div>
            <div className="w-[30%] mx-auto text-right">Account</div>
        </div>
    )
}

export default Header