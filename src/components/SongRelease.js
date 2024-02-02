import moment from "moment";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../store/actions'

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


const SongRelease = ({song, order, percent, isShowDate, text, hover, bg}) => {
    const dispatch = useDispatch()

    const handleClick = (songId) => {
        dispatch(actions.setCurrentSong(songId))
    }

    console.log(`check background: ${bg}`);

    return(
        <div id='song-release' key={song?.encodeId} 
            className={`flex w-full items-center justify-between songs-center rounded-lg p-3 gap-3 
            ${hover && 'hover:bg-sidebar'} ${bg && bg}`}
        >
            {order && 
                <span className={`max-w-[8%] min-w-[8%] text-2xl font-bold fill-transparent outline-2 text-yellow-50
                    ${order === 1 ? 'ktn-shadow-top1' : order === 2 ? 'ktn-shadow-top2' : 'ktn-shadow-top3'}
                `}
                >{order}
                </span>
            }
            <div className="min-w-[60px]">
                <img onClick={() => handleClick(song.encodeId)} className="size-[60px] rounded-lg cursor-pointer" src={song?.thumbnail}></img>
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