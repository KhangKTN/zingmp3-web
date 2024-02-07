import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import {getArtistAlbum} from '../../apis'
import {icons} from '../../ultis/icon'
import Song from "../../components/Song";
import { AlbumItem, HoverAlbum } from "../../components";

const {IoIosArrowForward} = icons

const Artist = () => {
    const location = useLocation()
    const [artist, setSearchData] = useState({})
    
    useEffect(() => {
        const fetchData = async() => {
            let name = ''
            if(location?.pathname.includes('nghe-si')){
                name = location.pathname.split('/')[2]
            }else{
                name = location.pathname.split('/')[1]
            }
            let res = await getArtistAlbum(name)
            if(res.data.err === 0) setSearchData(res.data.data)
            console.log(res.data.data);

        }
        fetchData()
    }, [])

    const convertFollower = (follower) => {
        let result = ''
        if(follower >= 1000000) result = Math.round(follower/100000)/10 + 'M'
        else if(follower >= 1000) result = (Math.round(follower/100)/10) + 'K'
        else result = follower
        return result
    }

    return(
        <div className="">
            <div className="w-lvw h-[400px] ktn-linear-bg  px-12 py-16 -translate-x-[48px] -mt-[102px] flex items-end">
                <div className="flex gap-8 items-center ">
                    <img className="rounded-full size-[140px]" src={artist?.thumbnail}></img>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl font-bold">{artist?.name}</h1>
                        <span className="">{new Intl.NumberFormat('en-DE').format(artist?.follow)} người quan tâm</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-fit mt-12">
                    <h1 className="text-xl font-bold mb-6">{artist?.sections && artist?.sections[0]?.topAlbum && 'Mới phát hành'}</h1>
                    <div className="py-3 px-5 mt-3 bg-[#c2cbcb] rounded-lg flex gap-5">
                        <div>
                            <img className="size-28 rounded-lg" src={artist?.sections && artist?.sections[0]?.topAlbum.thumbnail}></img>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm">{artist?.sections && artist?.sections[0]?.topAlbum.textType}</span>
                            <h1 className="font-semibold">{artist?.sections && artist?.sections[0]?.topAlbum.title}</h1>
                            <span className="text-gray-500 text-sm">{artist?.sections && artist?.sections[0]?.topAlbum.artistsNames}</span>
                            <h1 className="text-gray-500 text-sm mt-3">{artist?.sections && artist?.sections[0]?.topAlbum.releaseDate}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-12 mb-6">
                    <h1 className="text-xl font-bold">{artist?.sections && artist?.sections[0]?.title}</h1>
                    <div className="flex items-center text-gray-500 cursor-pointer hover:text-active">
                        <button className="">TẤT CẢ</button>
                        <IoIosArrowForward className="size-5 ml-3" />
                    </div>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-[2px] w-full overflow-hidden mt-3">
                    {artist?.sections && artist?.sections[0]?.items?.map(item => (
                        <Song key={item.encodeId} song={item} />
                    ))}
                </div>
            </div>
            <div className="">
                <div className="flex items-center justify-between mt-12 mb-6">
                    <h1 className="text-xl font-bold">{artist?.sections && artist?.sections[1]?.title}</h1>
                    <div className="flex items-center text-gray-500 cursor-pointer hover:text-active">
                        <button className="">TẤT CẢ</button>
                        <IoIosArrowForward className="size-5 ml-3" />
                    </div>
                </div>
                <div className="grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3">
                    {artist?.sections && artist.sections[1]?.items.map((item, index) => (
                        <AlbumItem item={item} single={1}/>
                    ))}
                </div>
            </div>
            <div className="">
                <div className="flex items-center justify-between mt-12 mb-6">
                    <h1 className="text-xl font-bold">{artist?.sections && artist?.sections[5]?.title}</h1>
                    <div className="flex items-center text-gray-500 cursor-pointer hover:text-active">
                        <button className="">TẤT CẢ</button>
                        <IoIosArrowForward className="size-5 ml-3" />
                    </div>
                </div>
                <div className="grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3">
                    {artist?.sections && artist.sections[5].items.map((item, index) => (
                        <AlbumItem key={item.encodeId} item={item}/>
                    ))}
                </div>
            </div>
            <div className="">
                <h1 className="mt-12 mb-6 font-bold text-xl">Về {artist.name}</h1>
                <div className="grid grid-cols-2 w-full gap-10">
                    <img className="w-full flex-auto rounded-lg h-auto object-cover" src={artist.thumbnail}></img>
                    <div className="w-full">
                        <p className="w-full">{artist?.biography}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artist