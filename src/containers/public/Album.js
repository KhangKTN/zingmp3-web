import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as apis from '../../apis'
import * as actions from '../../store/actions'
import moment from 'moment'
import { SongList, AudioLoading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {icons} from '../../ultis/icon'

const {IoPlayCircleOutline, FaPlay, IoPause} = icons


const Album = () => {
    const [playlist, setPlaylist] = useState('')
    const [isRotate, setIsRotate] = useState(false)
    
    const {currentSong, isPlay, songs} = useSelector(state => state.music)
    const {id} = useParams()
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchPlaylist = async() => {
            const res = await apis.getPlaylist(id)
            if(res?.data.err === 0){
                setPlaylist(res.data.data)
                dispatch(actions.setList(res.data.data.song.items))
                setIsRotate(res.data.data.song.items?.some(item => item.encodeId === currentSong))
            } 
        }
        fetchPlaylist()
    }, [id, currentSong])

    const handlePlayRandom = () => {
        // console.log(playlist);
        const random = Math.round(Math.random()*playlist?.song?.items?.length)
        console.log(random);
        dispatch(actions.setCurrentSong(songs[random].encodeId))
        dispatch(actions.setIsPlay(true))
    }

    return(
        <div className="flex xl:flex-row flex-col w-full gap-10 mt-5 xl:overflow-y-hidden">
            <div className="xl:w-[400px] w-full flex xl:flex-col flex-row items-center gap-10 xl:gap-1">
                <div className="xl:w-[300px] w-[250px] relative cursor-pointer overflow-hidden rounded-xl group">
                    <div className={`w-full shadow-xl ${!isPlay && 'group-hover:scale-110'} transition-all duration-500`}>
                        <img className={`w-full ${isRotate && isPlay ? 'rounded-full animate-rotate-center' : 'rounded-xl animate-rotate-pause'}`} src={playlist?.thumbnailM}></img>
                    </div>
                    <div className={`${isPlay ? '' : 'group-hover:bg-[#1212126c]'} text-white absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center`}>
                        {isPlay ? <AudioLoading w={40} h={40} border={1}/> : <IoPlayCircleOutline className="size-20"/>} 
                    </div>
                </div>
                <div className="flex flex-auto flex-col xl:text-center">
                    <h1 className="mt-3 my-3 font-bold text-2xl">{playlist?.title}</h1>
                    <div className="text-gray-500 flex flex-col xl:items-center gap-1 text-base w-full">
                        <span>Tổng số: {playlist?.song?.items?.length} bài hát</span>
                        <span>Thời lượng: {moment.utc(playlist?.song?.totalDuration*1000).format('hh [giờ] mm [phút]')}</span>
                        <h1>Cập nhật: {moment.unix(playlist.contentLastUpdate).format("DD/MM/YYYY")}</h1>
                        <h1>{playlist.artistsNames}</h1>
                        <h1>Số lượt thích: {Math.round(playlist.like/1000)}K lượt thích</h1>
                        <button className="mt-2 px-6 py-2 uppercase bg-slider-bar text-white w-fit rounded-full">
                            {isRotate && isPlay && <span onClick={() => dispatch(actions.setIsPlay(false))} className="flex items-center gap-3"><IoPause/>Tạm dừng</span>}
                            {isRotate && !isPlay && <span onClick={() => dispatch(actions.setIsPlay(true))} className="flex items-center gap-3"><FaPlay/>Tiếp tục phát</span>}
                            {!isRotate && <span onClick={() => handlePlayRandom()} className="flex items-center gap-3"><FaPlay/>Phát ngẫu nhiên</span>}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-auto w-full h-full overflow-y-auto">
                <div className="mb-3 text-gray-600 font-semibold">Lời tựa:<span className="text-gray-500 font-medium"> {playlist?.sortDescription}</span></div>
                <SongList 
                    totalDuration={playlist?.song?.totalDuration}
                />
            </div>
        </div>
    )
}

export default Album