import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import * as apis from '../apis'
import {icons} from '../ultis/icon'
import * as actions from '../store/actions'
import { toast } from 'react-toastify';

const {IoMdHeartEmpty, BsThreeDots, IoPlayCircleOutline, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled,
    TbRepeat, TbArrowsShuffle, PiPauseCircle
} = icons

const Player = () => {
    const [song, setSong] = useState('')
    const [timeCur, setTimeCur] = useState(0)
    let [audioController, setAudioController] = useState(new Audio())
    const {currentSong, isPlay} = useSelector(state => state.music)

    const dispatch = useDispatch()
    const ref = useRef()
    const refTrack = useRef()

    useEffect(() => {
        const fetchSong = async() => {
            //Get detail info song
            let res = await apis.getInfoSong(currentSong)
            if(res?.data.err === 0) setSong(res.data.data)
            //Get audio source
            let res1 = await apis.getSongMp3(currentSong)
            // console.log(res);
            if(res1?.data.err === 0){
                audioController.src = res1.data.data[128]
                audioController.load()
                if(isPlay){
                    audioController.play();
                }
            }
            else{
                audioController.src = 'vip'
                toast.error("Bài hát này chỉ dành cho tài khoản VIP")
            }
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
                if (Math.round(audioController.currentTime) === Math.round(audioController.duration) || audioController.src.includes('vip')){
                    clearInterval(interval)
                    setTimeCur(0)
                    ref.current.style.cssText = `width: 0%`
                    dispatch(actions.setIsPlay(false))
                    return
                }
                ref.current.style.cssText = `width: ${getProgress(audioController.currentTime)}%`
                setTimeCur(Math.round(audioController.currentTime*1000))
            }, 1000);
        }
        return () => {interval && clearInterval(interval)}
    }, [isPlay])

    const handlePlay = async() => {
        if(isPlay){
            audioController.pause()
        }
        else {
            if(audioController.src.includes('vip')){
                toast.error("Bài hát này chỉ dành cho tài khoản VIP"); 
                return
            } 
            else audioController.play()
        } 
        dispatch(actions.setIsPlay(!isPlay))
    }

    const getProgress = (time) => {
        console.log((time));
        console.log(audioController.duration);
        return Math.round(time*100/audioController?.duration)
    }

    const handleSeek = (e) => {
        const track = refTrack.current.getBoundingClientRect()
        const per = Math.round((e.clientX - track.left) / track.width*100)
        console.log(per);
        audioController.currentTime = per/100*audioController.duration
        ref.current.style.cssText = `width: ${getProgress(audioController.currentTime)}%`
    }

    return(
        <div className="px-6 py-3 h-full flex justify-between items-center">
            <div className="h-full w-full flex items-center gap-3">
                <div className="h-full w-[30%] transition-all duration-400 ease-in-out rounded-md flex gap-3 items-center">
                    <div className="h-full">
                        <img className="h-full size-16 rounded-md" src={song?.thumbnail} />
                    </div>
                    <div className="me-3">
                        <h1>{song?.title}</h1>
                        <h1 className="text-gray-600 font-light text-xs">{song?.artistsNames}</h1>
                    </div>
                    <IoMdHeartEmpty className="cursor-pointer"/>
                    <BsThreeDots className="cursor-pointer"/>
                </div>
                <div className="flex-auto flex flex-col items-center">
                    <div className="flex items-center gap-6">
                        <TbArrowsShuffle title="Bật phát ngẫu nhiên" className="size-5 cursor-pointer"/>
                        <TbPlayerSkipBackFilled className="size-5 text-gray-500 cursor-not-allowed"/>
                        {isPlay ? 
                        <PiPauseCircle onClick={() => handlePlay()} className="size-10 cursor-pointer hover:text-active"/>
                        : <IoPlayCircleOutline onClick={() => handlePlay()} className="size-10 cursor-pointer hover:text-active"/>
                        }
                        <TbPlayerSkipForwardFilled className="size-5 cursor-pointer"/>
                        <TbRepeat title="Bật phát lại tất cả" className="size-5 cursor-pointer"/>
                    </div>
                    <div className="flex gap-3 items-center justify-center select-none w-full">
                        <span className="min-w-10 text-sm text-gray-500">{moment.utc(timeCur).format('mm:ss')}</span>
                        <div ref={refTrack} onClick={(e) => handleSeek(e)} className="w-[70%] h-1 hover:h-[6px] cursor-pointer bg-gray-400 relative rounded-md">
                            <div ref={ref} className={`rounded-md absolute h-full bg-slider-bar top-0 left-0 transition-all ease-linear`}>
                            </div>
                            {/* <div className="size-3 hidden hover:block absolute left-10 top-1/2 -translate-y-1/2 bg-slider-bar rounded-full"></div> */}
                        </div>
                        <span className="text-sm">{moment.utc(song?.duration*1000).format('mm:ss')}</span>
                    </div>
                </div>
                <div className="w-[30%]">
                    TEST PLAY MUSIC
                </div>
            </div>
        </div>
    )
}

export default Player