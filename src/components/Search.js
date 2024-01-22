import { icons } from "../ultis/icon"

const {IoIosSearch} = icons

const Search = () => {
    return(
        <div className="flex items-center w-[440px]">
            <span className="bg-active px-1 h-10 box-border rounded-s-3xl pt-1 text-gray-400"><IoIosSearch className="size-8"/></span>
            <input className="w-full h-10 outline-none bg-active rounded-e-3xl"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            />
        </div>
    )
}

export default Search