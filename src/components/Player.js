import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import * as apis from '../apis'
import {icons} from '../ultis/icon'
import * as actions from '../store/actions'
import { toast } from 'react-toastify';
import { RotatingLine } from "./";

const { IoPlayCircleOutline, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled,
    TbRepeat, TbArrowsShuffle, PiPauseCircle, TbRepeatOnce, PiPlaylistFill, IoVolumeMuteOutline, IoVolumeMediumOutline
} = icons

const Player = ({isShowRSidebar, setIsShowRSidebar}) => {
    const [song, setSong] = useState('')
    const [timeCur, setTimeCur] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeat, setRepeat] = useState('')
    let [audioController, setAudioController] = useState(new Audio())
    const [volume, setVolume] = useState(1)
    // const [is]
    const [isLoaded, setIsLoaded] = useState(false)
    
    const {currentSong, isPlay, songs} = useSelector(state => state.music)

    const dispatch = useDispatch()
    const ref = useRef()
    const refTrack = useRef()
    const refDot = useRef()

    useEffect(() => {
        const fetchSong = async() => {
            setIsLoaded(false)
            //Get detail info song
            let res = await apis.getInfoSong(currentSong)
            if(res?.data.err === 0) setSong(res.data.data)
            //Get audio source
            let res1 = await apis.getSongMp3(currentSong)
            // console.log(res);
            if(res1?.data.err === 0){
                audioController.src = res1.data.data[128]
                audioController.load()
                const {encodeId, thumbnail, title, artistsNames} = res.data.data
                dispatch(actions.setSongRecent({
                    encodeId, thumbnail, title, artistsNames
                }))
                if(isPlay){
                    audioController.play();
                }
            }
            else{
                audioController.src = null
                toast.error("Bài hát này chỉ dành cho tài khoản VIP")
            }
            setIsLoaded(true)
        }
        if(currentSong){
            fetchSong()
        }
    }, [currentSong])

    useEffect(() => {
        window.addEventListener("beforeunload", () => dispatch(actions.setIsPlay(false)));
        let interval
        if(isPlay){
            interval = setInterval(() => {
                if ((audioController.currentTime) === (audioController.duration) || !audioController.src.includes('a128')){
                    clearInterval(interval)
                    setTimeCur(0)
                    ref.current.style.cssText = `width: 0%`
                    refDot.current.style.cssText = `left: 0%`
                    if(repeat === 'one') audioController.play()
                    else if(repeat === 'all') handleNext()
                    else dispatch(actions.setIsPlay(false))
                    return
                }
                ref.current.style.cssText = `width: ${getProgress(audioController.currentTime)}%`
                refDot.current.style.cssText = `left: ${getProgress(audioController.currentTime)}%`
                setTimeCur(Math.round(audioController.currentTime*1000))
            }, 1000);
        }
        return () => {interval && clearInterval(interval)}
    }, [isPlay, timeCur])

    useEffect(() => {
        handlePlay(1)
    }, [isPlay])

    const handlePlay = (flag) => {
        if(!audioController.src.includes('a128')) return
        if(flag){
            isPlay ? audioController.play() : audioController.pause()
        }
        else{
            if(isPlay){
                audioController.pause()
            }
            else {
                audioController.play()
            } 
            dispatch(actions.setIsPlay(!isPlay))
        }
    }

    const getProgress = (time) => {
        // console.log((time));
        return Math.round(time*100/audioController?.duration)
    }

    const handleSeek = (e) => {
        const track = refTrack.current.getBoundingClientRect()
        const per = Math.round((e.clientX - track.left) / track.width*100)
        audioController.currentTime = per/100*audioController.duration
        ref.current.style.cssText = `width: ${getProgress(audioController.currentTime)}%`
        refDot.current.style.cssText = `left: ${getProgress(audioController.currentTime)}%`
    }

    const handleNext = () => {
        if(songs){
            let songIndex = ''
            songs?.forEach((element, index) => {
                if(element.encodeId === song.encodeId){
                    songIndex = index
                }
            });
            dispatch(actions.setCurrentSong(songs[songIndex+1 === songs.length ? 0 : songIndex+1].encodeId))
        }
    }

    const handlePrevious = () => {
        if(songs){
            let songIndex = ''
            songs?.forEach((element, index) => {
                if(element.encodeId === song.encodeId){
                    songIndex = index
                }
            });
            dispatch(actions.setCurrentSong(songs[songIndex === 0 ? songs.length - 1 : songIndex-1].encodeId))
        }
    }

    const handleShuffle = () => {
        setIsShuffle(!isShuffle)
        const random = Math.round(Math.random()*songs?.length) - 1
    }

    const handleRepeat = () => {
        if(repeat === '') setRepeat('all')
        else if(repeat === 'all') setRepeat('one')
        else setRepeat('')
    }

    const handleVolume = (event) => {
        audioController.volume = event.target.value
        setVolume(event.target.value)
    }

    return(
        <div className="px-6 py-3 h-full flex justify-between items-center">
            <div className="h-full w-full flex items-center gap-5">
                <div className="h-full w-[30%] transition-all duration-400 ease-in-out rounded-md flex gap-3 items-center">
                    <div className="h-full">
                        <img className="h-full min-w-16 rounded-md" src={song?.thumbnail} />
                    </div>
                    <div className="me-3 overflow-hidden">
                        <h1 className="truncate">{song?.title}</h1>
                        <h1 className="text-gray-600 font-light text-xs">{song?.artistsNames}</h1>
                    </div>
                </div>
                <div className="flex-auto flex flex-col items-center">
                    <div className="flex items-center gap-6">
                        <TbArrowsShuffle onClick={() => handleShuffle()} title="Bật phát ngẫu nhiên" className={`size-5 cursor-pointer ${isShuffle && 'text-active'}`} />
                        <TbPlayerSkipBackFilled onClick={() => handlePrevious()} className={`size-5 hover:text-active cursor-pointer ${!song && 'cursor-not-allowed text-gray-500'}`}/>
                        {!isLoaded && currentSong ? <RotatingLine/> : 
                            (isPlay ? 
                            <PiPauseCircle onClick={() => handlePlay()} className="size-10 cursor-pointer hover:text-active"/>
                            : <IoPlayCircleOutline onClick={() => handlePlay()} className="size-10 cursor-pointer hover:text-active"/>
                            )
                        }
                        <TbPlayerSkipForwardFilled onClick={() => handleNext()} className={`size-5 hover:text-active cursor-pointer ${!song && 'cursor-not-allowed text-gray-500'}`}/>
                        <span className="cursor-pointer" onClick={() => handleRepeat()}>
                            {repeat === 'one' ? 
                                <TbRepeatOnce title='Tắt phát lại' className="size-5 text-active"/> :
                                <TbRepeat title={repeat === 'all' ? 'Bật phát lại 1 bài' : 'Bật phát lại tất cả'} className={`size-5 ${repeat === 'all' && 'text-active'}`}/>
                            }
                        </span>
                    </div>
                    <div className="flex gap-3 items-center justify-center select-none w-full">
                        <span className="min-w-10 text-sm text-gray-500">{moment.utc(timeCur).format('mm:ss')}</span>
                        <div ref={refTrack} onClick={(e) => handleSeek(e)} className="w-[90%] h-1 hover:h-[6px] cursor-pointer bg-gray-400 relative rounded-md group">
                            <div ref={ref} className={`rounded-md absolute h-full bg-slider-bar top-0 left-0 transition-all ease-linear`}></div>
                            <div ref={refDot} className="size-3 hidden group-hover:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slider-bar transition-all ease-linear rounded-full"></div>
                        </div>
                        <span className="text-sm">{song ? moment.utc(song?.duration*1000).format('mm:ss') : ''}</span>
                    </div>
                </div>
                <div className="w-[30%] flex justify-end gap-3 items-center">
                    <span className="cursor-pointer" onClick={() => audioController.muted = !audioController.muted}>
                        {audioController.muted ? <IoVolumeMuteOutline className="size-6"/> : <IoVolumeMediumOutline className="size-6"/>}
                    </span>
                    <input onChange={(event) => handleVolume(event)} className="bg-gray-400 appearance-none rounded-md accent-active h-1" type="range" step={0.02} min={0} max={1} value={volume}/>
                    <span className={`rounded-md p-1 ${isShowRSidebar ? 'bg-slider-bar text-white hover:opacity-90' : 'hover:text-active'}`}>
                        <PiPlaylistFill onClick={() => setIsShowRSidebar(pre => !pre)} className={`size-6 cursor-pointer`}/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Player