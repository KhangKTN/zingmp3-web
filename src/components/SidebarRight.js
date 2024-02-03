import { useEffect, useState } from "react"
import {icons} from '../ultis/icon'
import { useDispatch, useSelector } from "react-redux"
import {getInfoSong} from '../apis'
import SongRelease from "./SongRelease"
import * as actions from '../store/actions'

const {BsFillTrash3Fill} = icons

const SidebarRight = () => {
    const [actBtnPlaylist, setActBtnPlaylist] = useState(true)
    const [songPlaying, setSongPlaying] = useState('')
    const [pos, setPos] = useState(0)

    const {currentSong, songs, songRecent} = useSelector(state => state.music)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSongPlaying = async() => {
            let res = await getInfoSong(currentSong)
            if(res.data.err === 0) setSongPlaying(res.data.data)
        }
        fetchSongPlaying()
        let index = songs?.findIndex(item => item.encodeId === currentSong)
        if(index >= 0) setPos(index)
    }, [currentSong])

    return(
        <div className="px-2 pb-10">
            <div className="h-[70px] sticky top-0 z-50 bg-primary flex items-center justify-between">
                <div className="rounded-full p-[3px] h-fit bg-[#dde3e3] flex w-fit text-sm">
                    <button onClick={() => setActBtnPlaylist(true)} className={`px-4 rounded-full py-1 ${actBtnPlaylist && 'text-active shadow-md bg-[#e8eaea]'}`}>Danh sách phát</button>
                    <button onClick={() => setActBtnPlaylist(false)} className={`px-4 rounded-full py-1 ${!actBtnPlaylist && 'text-active shadow-md bg-[#e8eaea]'}`}>Nghe gần đây</button>
                </div>
                <button className="rounded-full p-2 bg-[#dde3e3] hover:bg-[#e8eaea] flex items-center justify-center">
                    <BsFillTrash3Fill onClick={() => dispatch(actions.clearSongRecent())} className="size-5 text-gray-700 hover:text-active" />
                </button>
            </div>
            {actBtnPlaylist &&
                <div>
                    <div className="">
                        {currentSong && <SongRelease song={songPlaying} bg={'bg-[#0f8080]'} text={'text-white'} size={1} padding={1} />}
                        <h1 className="mt-3 font-semibold">Tiếp theo</h1>
                    </div>
                    <div className="">
                        {songs?.map((item, index) => (
                            index > pos && <SongRelease key={item.encodeId} song={item} hover={1} size={1} padding={1} />
                        ))}
                    </div>
                </div>
            }
            {!actBtnPlaylist &&
                songRecent?.map((item) => (
                    <SongRelease key={item.encodeId} song={item} hover={1} size={1} padding={1}/>
                ))
            }
        </div>
    )
}

export default SidebarRight 