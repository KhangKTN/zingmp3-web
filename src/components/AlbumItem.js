import { useState } from "react"
import { Link } from "react-router-dom"
import HoverAlbum from "./HoverAlbum"

const AlbumItem = ({item, single}) => {
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
            {single && <h1 className=" text-gray-500 hover:text-active cursor-pointer text-sm truncate">{item?.releaseDateText}</h1>}
            {!single &&
                <div>
                    {item?.artists?.map((item, index, arr) => (
                        index < 3 &&
                        <div key={index} className="text-xs text-gray-500 inline">
                            <Link to={item?.link} className="hover:underline hover:text-active" key={item?.id}>{item?.name}</Link>
                            <span className="">{arr.length > 2 ? (index < 2 ? ', ' : ',...' ) : (index !== arr.length - 1 && ', ')}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default AlbumItem