import { memo, useEffect, useState } from "react"
import {icons} from '../ultis/icon'
import { useDispatch, useSelector } from "react-redux"
import moment from "moment";
import * as actions from '../store/actions'
import AudioLoading from "./AudioLoading";

const {PiMusicNotesThin, IoPlayCircleOutline} = icons

const Song = ({song, isAlbum, order}) => {
    const dispatch = useDispatch()
    const {currentSong, isPlay} = useSelector(state => state.music)
    const [isHover, setIsHover] = useState(false)

    const handleClickSong = () => {
        dispatch(actions.setCurrentSong(song.encodeId))
        dispatch(actions.setIsPlay(true))
        dispatch(actions.setIsNext(true))
    }

    return(
        <div className={`${currentSong === song?.encodeId && 'bg-sidebar'} flex px-3 py-2 rounded-md gap-10 items-center justify-between hover:bg-sidebar border-b-[1px] border-[#0000000d]`}>
            <div className={`flex items-center gap-2 ${isAlbum ? 'min-w-[50%] max-w-[50%]' : 'min-w-[75%] max-w-[75%]'}`}>
                {order ? <h1 className={`mr-2 ${order === 1 ? 'ktn-shadow-top1' : order === 2 ? 'ktn-shadow-top2' : order === 3 ? 'ktn-shadow-top3' : 'ktn-shadow-top4'}`}>{order}</h1> :
                    <PiMusicNotesThin className="size-5"/>
                } 
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => handleClickSong()} className="w-10 relative cursor-pointer">
                    <img className="min-w-10 rounded" src={song?.thumbnail} />
                    {/* <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                        {songPlaying && isCurrentAlbum && isPlay && <AudioLoading w={20} h={20} border={0}/>}
                        {songPlaying && isCurrentAlbum && !isPlay && <IoPlayCircleOutline className="size-10 text-white"/>}
                    </div> */}
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                        {isPlay && currentSong === song?.encodeId && <AudioLoading w={20} h={20} border={0} />}
                        {((currentSong !== song?.encodeId && isHover) || (!isPlay && currentSong === song?.encodeId)) && <IoPlayCircleOutline className='size-8 text-white' />}
                    </div>
                </div>
                <div className="flex flex-col w-full overflow-hidden">
                    <h1 className="truncate" >{song?.title.length > 30 ? `${song?.title?.slice(0, 35)}...`: song?.title}</h1>
                    <h1 className="text-gray-500 text-sm truncate">{song?.artistsNames}</h1>
                </div>
            </div>
            {isAlbum && <div className="w-[40%]">{song?.album?.title?.length > 30 ? `${song?.album?.title.slice(0, 30)}...` : song?.album?.title}</div>} 
            <div className="flex-auto text-right text-gray-500">{moment.unix(song?.duration).format('mm:ss')}</div>
        </div>
    )
}

export default memo(Song)