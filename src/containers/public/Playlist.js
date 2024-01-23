import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as apis from '../../apis'
import moment from 'moment'
import { SongList } from "../../components";

const Playlist = () => {
    const [playlist, setPlaylist] = useState('')
    const {title, id} = useParams()

    useEffect(() => {
        const fetchPlaylist = async() => {
            const res = await apis.getPlaylist(id)
            console.log(res);
            if(res?.data.err === 0) setPlaylist(res.data.data)
        }
        fetchPlaylist()
    }, [id])

    return(
        <div className="flex xl:flex-row flex-col w-full gap-10 mt-5 xl:overflow-y-hidden">
            <div className="xl:w-1/4 w-full flex xl:flex-col flex-row items-center gap-10 xl:gap-1">
                <img className="rounded-xl size-[200px] cursor-pointer object-contain hover:object-scale-down" src={playlist?.thumbnailM}></img>
                <div className="flex flex-col w-full xl:text-center">
                    <h1 className="mt-3 my-3 font-bold text-2xl">{playlist?.title}</h1>
                    <div className="text-gray-500 flex flex-col gap-1 text-base w-full">
                        <span>{playlist?.song?.items?.length} bài hát / {moment.utc(playlist?.song?.totalDuration*1000).format('hh [giờ] mm [phút]')}</span>
                        <h1>Cập nhật: {moment.unix(playlist.contentLastUpdate).format("DD/MM/YYYY")}</h1>
                        <h1>{playlist.artistsNames}</h1>
                        <h1>Số lượt thích: {Math.round(playlist.like/1000)}K lượt thích</h1>
                    </div>
                </div>
            </div>
            <div className="xl:w-3/4 w-full h-full overflow-y-auto">
                <div className="mb-3">Lời tựa<span className="text-gray-500 font-semibold"> {playlist?.sortDescription}</span></div>
                <SongList 
                    songlist={playlist?.song?.items}
                    totalDuration={playlist?.song?.totalDuration}
                />
            </div>
        </div>
    )
}

export default Playlist