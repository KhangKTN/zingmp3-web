import { memo } from "react"
import {icons} from '../ultis/icon'
import { UseDispatch, useDispatch } from "react-redux"
import * as actions from '../store/actions'

const {PiMusicNotesThin} = icons

const Song = ({song}) => {
    const dispatch = useDispatch()

    const getFormatTime = (time) => {
        console.log('check time:', time);
        let minute = Math.round(time/60) 
        let second = Math.round(time%60) 
        if(second < 10) second = '0' + second
        return `${minute}:${second}`
    }

    return(
        <div className="flex px-3 py-2 hover:rounded-md gap-10 items-center justify-between hover:bg-sidebar border-t-[1px] border-[#0000000d]">
            <div className="flex items-center gap-2 min-w-[50%]">
                <PiMusicNotesThin className="size-5"/>
                {/* <input type='checkbox' className="size-4 hidden hover:group-[]:block"/> */}
                <img onClick={() => dispatch(actions.setCurrentSong(song.encodeId))} className="size-10 rounded object-cover cursor-pointer" src={song.thumbnailM} />
                <div className="flex flex-col w-full">
                    <h1 >{song?.title.length > 30 ? `${song?.title?.slice(0, 35)}...`: song.title}</h1>
                    <h1 className="text-gray-500 text-sm">{song.artistsNames}</h1>
                </div>
            </div>
            <div className="w-[40%]">{song?.album?.title.length > 30 ? `${song?.album?.title.slice(0, 30)}...` : song.album?.title}</div>
            <div className="flex-auto">{getFormatTime(song?.duration)}</div>
        </div>
    )
}

export default memo(Song)