import { memo } from "react"
import {icons} from '../ultis/icon'
import { UseDispatch, useDispatch } from "react-redux"
import moment from "moment";
import * as actions from '../store/actions'

const {PiMusicNotesThin} = icons

const Song = ({song}) => {
    const dispatch = useDispatch()

    const handleClickSong = () => {
        dispatch(actions.setCurrentSong(song.encodeId))
        dispatch(actions.setIsPlay(true))
        dispatch(actions.setIsNext(true))
    }

    return(
        <div className="flex px-3 py-2 hover:rounded-md gap-10 items-center justify-between hover:bg-sidebar border-t-[1px] border-[#0000000d]">
            <div className="flex items-center gap-2 min-w-[50%]">
                <PiMusicNotesThin className="size-5"/>
                {/* <input type='checkbox' className="size-4 hidden hover:group-[]:block"/> */}
                <img onClick={() => handleClickSong()} className="size-10 rounded object-cover cursor-pointer" src={song.thumbnailM} />
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