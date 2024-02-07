import { icons } from "../ultis/icon"
import SearchBar from "./SearchBar"

const { PiArrowLeftThin, PiArrowRightThin } = icons

const Header = () => {
    return (
        <div className="flex px-12 z-[5] sticky top-0 items-center bg-[#ced9d99c] shadow-md w-full justify-between backdrop-blur-md gap-3 h-[70px] mb-3">
            <div className="flex items-center gap-6 h-full w-[70%]">
                <div className="flex gap-6">
                    <PiArrowLeftThin className="size-6 hover:text-active cursor-pointer"/>
                    <PiArrowRightThin className="size-6 hover:text-active cursor-pointer"/>
                </div>
                <div className="flex-1">
                    <SearchBar/>
                </div>
            </div>
            <div className="w-[30%] mx-auto text-right">Account</div>
        </div>
    )
}

export default Header