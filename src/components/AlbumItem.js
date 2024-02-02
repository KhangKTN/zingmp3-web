import { useState } from "react"
import { Link } from "react-router-dom"
import HoverAlbum from "./HoverAlbum"

const AlbumItem = ({item}) => {
    const [isHover, setIsHover] = useState(false)

    return(
        <div className="w-full overflow-hidden">
            <Link className="" to={item.link?.split('.')[0]}>
                <div className="w-full overflow-hidden rounded-lg cursor-pointer">
                    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="relative  hover:scale-110 transition-all duration-500 ">
                        <img className="w-full" src={item.thumbnail}></img>
                        <div className="absolute rounded-lg top-0 right-0 left-0 bottom-0 hover:bg-[#1212126c] transition-all">
                        </div>
                        {isHover && <HoverAlbum/>}
                    </div>
                </div>
                <h1 className="mt-1 text-gray-600 hover:text-active cursor-pointer truncate">{item?.title}</h1>
            </Link>
                {item?.artists.map((item, index) => (
                    index < 3 &&
                    <h1 key={index} className="text-xs text-gray-500 inline">
                        <Link to={item.link} className="hover:underline hover:text-active" key={item.id}>{item.name}</Link>
                        <span>{index < 2 ? ', ' : ',...'}</span>
                    </h1>
                ))}
        </div>
    )
}

export default AlbumItem