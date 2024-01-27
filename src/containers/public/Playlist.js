import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as apis from '../../apis'
import * as actions from '../../store/actions'
import moment from 'moment'
import { AudioLoading, SongList } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {icons} from '../../ultis/icon'

const {IoPlayCircleOutline} = icons

const Playlist = () => {
    const [playlist, setPlaylist] = useState('')
    const [isRotate, setIsRotate] = useState(false)

    const {id} = useParams()
    const {currentSong, isPlay, songs} = useSelector(state => state.music)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchPlaylist = async() => {
            const res = await apis.getPlaylist(id)
            if(res?.data.err === 0) setPlaylist(res.data.data)
            dispatch(actions.setList(res.data.data.song.items))
        }
        fetchPlaylist()
        setIsRotate(songs?.some(item => item.encodeId === currentSong))
    }, [id, songs])

    return(
        <div className="flex xl:flex-row flex-col w-full gap-10 mt-5 xl:overflow-y-hidden">
            <div className="xl:w-1/4 w-full flex xl:flex-col flex-row items-center gap-10 xl:gap-1">
                <div className="w-[250px] relative cursor-pointer overflow-hidden rounded-xl group">
                    <div className={`w-full shadow-xl ${!isPlay && 'group-hover:scale-110'} transition-all duration-300`}>
                        <img className={`w-full ${isRotate && isPlay ? 'rounded-full animate-rotate-center' : 'rounded-xl animate-rotate-pause'}`} src={playlist?.thumbnailM}></img>
                    </div>
                    <div className={`${isPlay ? '' : 'group-hover:bg-[#1212126c]'} text-white absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center`}>
                        {isPlay ? <AudioLoading/> : <IoPlayCircleOutline className="size-20"/>} 
                    </div>
                </div>
                <div className="flex flex-auto flex-col xl:text-center">
                    <h1 className="mt-3 my-3 font-bold text-2xl">{playlist?.title}</h1>
                    <div className="text-gray-500 flex flex-col gap-1 text-base w-full">
                        <span>Tổng số: {playlist?.song?.items?.length} bài hát</span>
                        <span>Thời lượng: {moment.utc(playlist?.song?.totalDuration*1000).format('hh [giờ] mm [phút]')}</span>
                        <h1>Cập nhật: {moment.unix(playlist.contentLastUpdate).format("DD/MM/YYYY")}</h1>
                        <h1>{playlist.artistsNames}</h1>
                        <h1>Số lượt thích: {Math.round(playlist.like/1000)}K lượt thích</h1>
                    </div>
                </div>
            </div>
            <div className="xl:w-3/4 w-full h-full overflow-y-auto">
                <div className="mb-3">Lời tựa<span className="text-gray-500 font-semibold"> {playlist?.sortDescription}</span></div>
                <SongList 
                    totalDuration={playlist?.song?.totalDuration}
                />
            </div>
        </div>
    )
}

export default Playlist