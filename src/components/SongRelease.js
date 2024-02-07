import moment from "moment";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
import {icons} from '../ultis/icon'
import AudioLoading from "./AudioLoading";

const {IoPlayCircleOutline} = icons

moment.locale('vi')
moment.updateLocale('vi', {
    relativeTime: {
        future: "in %s",
        past: "%s trước",
        s: 'vài giây',
        ss: '%d giây',
        m: "a minute",
        mm: "%d phút",
        h: "an hour",
        hh: "%d giờ",
        d: "1 ngày",
        dd: "%d ngày",
        w: "một tuần",
        ww: "%d tuần",
        M: "một tháng",
        MM: "%d tháng",
    }
});


const SongRelease = ({song, order, percent, isShowDate, text, hover, bg, size, padding}) => {
    const {currentSong, isPlay} = useSelector(state => state.music)
    const [isHover, setIsHover] = useState(false)
    const dispatch = useDispatch()

    const handleClick = (songId) => {
        dispatch(actions.setCurrentSong(songId))
        dispatch(actions.setIsPlay(true))
    }

    return(
        <div key={song?.encodeId} 
            className={`flex w-full items-center justify-between songs-center rounded-lg gap-3 
                ${hover && 'hover:bg-sidebar'} ${bg && bg}
                ${padding ? 'p-2' : 'p-3'}`
            }
        >
            {order && 
                <span className={`max-w-[8%] min-w-[8%] text-2xl font-bold fill-transparent outline-2 text-yellow-50
                    ${order === 1 ? 'ktn-shadow-top1' : order === 2 ? 'ktn-shadow-top2' : 'ktn-shadow-top3'}
                `}
                >{order}
                </span>
            }
            <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => handleClick(song.encodeId)} className={`relative cursor-pointer ${padding ? 'min-w-[40px]' : 'min-w-[60px]'}`}>
                <img className={`rounded-lg ${size ? 'size-[40px]' : 'size-[60px]'}`} src={song?.thumbnail}></img>
                <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                    {isPlay && currentSong === song?.encodeId && <AudioLoading w={padding ? 20 : 30} h={padding ? 20 : 30} border={0}/>}
                    {((currentSong !== song?.encodeId && isHover) || (!isPlay && currentSong === song?.encodeId)) && <IoPlayCircleOutline className={`${padding ? 'size-8' : 'size-10'} text-white`}/>}
                </div>
            </div>
            <div className="flex flex-auto flex-col justify-center gap-1 overflow-hidden">
                <h1 className={`text-sm truncate ${text ? text : 'text-black'}`}>{song?.title}</h1>
                <span className={`truncate text-xs ${text ? `${text} font-extralight` : 'text-gray-500'}`}>{song?.artistsNames}</span>
                {isShowDate && <span className="text-xs text-gray-500">{moment.unix(song?.releaseDate).fromNow()}</span>} 
            </div>
            {percent && <span className="text-xl font-bold text-white">{Math.round(percent*100)}%</span>}
        </div>
    )
}

export default memo(SongRelease) 