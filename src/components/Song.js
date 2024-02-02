import { memo, useEffect, useState } from "react"
import {icons} from '../ultis/icon'
import { UseDispatch, useDispatch, useSelector } from "react-redux"
import moment from "moment";
import * as actions from '../store/actions'
import AudioLoading from "./AudioLoading";

const {PiMusicNotesThin, IoPlayCircleOutline} = icons

const Song = ({song}) => {
    const dispatch = useDispatch()
    const {currentSong, isPlay, songs} = useSelector(state => state.music)
    const [songPlay, setSongPlay] = useState(false)
    const [isCurrentAlbum, setIsCurrentAlbum] = useState(false)

    useEffect(() => {
        song.encodeId === currentSong ? setSongPlay(true) : setSongPlay(false)
        songs.some(item => item.encodeId === currentSong) ? setIsCurrentAlbum(true) : setIsCurrentAlbum(false)
    }, [currentSong])

    const handleClickSong = () => {
        dispatch(actions.setCurrentSong(song.encodeId))
        dispatch(actions.setIsPlay(true))
        dispatch(actions.setIsNext(true))
    }

    return(
        <div className={`${songPlay && isCurrentAlbum && 'bg-sidebar'} flex px-3 py-2 rounded-md gap-10 items-center justify-between hover:bg-sidebar border-t-[1px] border-[#0000000d]`}>
            <div className="flex items-center gap-2 min-w-[50%] max-w-[50%]">
                <PiMusicNotesThin className="size-5"/>
                {/* <input type='checkbox' className="size-4 hidden hover:group-[]:block"/> */}
                <div onClick={() => handleClickSong()} className="w-10 relative cursor-pointer">
                    <img className="min-w-10 z-10 rounded" src={song.thumbnailM} />
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                        {songPlay && isCurrentAlbum && isPlay && <AudioLoading w={20} h={20} border={0}/>}
                        {songPlay && isCurrentAlbum && !isPlay && <IoPlayCircleOutline className="size-5 text-white"/>}
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <h1 >{song?.title.length > 30 ? `${song?.title?.slice(0, 35)}...`: song.title}</h1>
                    <h1 className="text-gray-500 text-sm">{song.artistsNames}</h1>
                </div>
            </div>
            <div className="w-[40%]">{song?.album?.title.length > 30 ? `${song?.album?.title.slice(0, 30)}...` : song.album?.title}</div>
            <div className="flex-auto">{moment.unix(song?.duration).format('mm:ss')}</div>
        </div>
    )
}

export default memo(Song)