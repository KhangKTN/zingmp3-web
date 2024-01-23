import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as apis from '../apis'
import {icons} from '../ultis/icon'
import * as actions from '../store/actions'

const {IoMdHeartEmpty, BsThreeDots, IoPlayCircleOutline, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled,
    TbRepeat, TbArrowsShuffle, PiPauseCircle
} = icons

const Player = () => {
    const [song, setSong] = useState('')
    const [source, setSource] = useState('')
    const [timeCur, setTimeCur] = useState('0:00')
    let [audioController, setAudioController] = useState(new Audio())

    const {currentSong, isPlay} = useSelector(state => state.music)
    console.log('check current song:', currentSong);

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSong = async() => {
            //Get detail info song
            let res = await apis.getInfoSong(currentSong)
            if(res?.data.err === 0) setSong(res.data.data)
            //Get audio source
            let res1 = await apis.getSongMp3(currentSong)
            if(res1?.data.err === 0){
                audioController.src = res1.data.data[128]
                setSource(res1.data.data[128])
            }
            console.log('check source music:', audioController.src);
        }
        if(currentSong) fetchSong()
    }, [currentSong, source])

    // useEffect(() => {
    //     if(!isPlay) return
    //     let interval = setInterval(() => {
    //         if(isPlay){
    //             console.log(audioController.currentTime);
    //             setTimeCur(getFormatTime(audioController.currentTime))
    //         }
    //     }, 1000);
    //     return () => {
    //         interval && clearInterval(interval)
    //     }
    // }, [isPlay])


    const handlePlay = async() => {
        // setIsPlay(!isPlay)
        console.log('click play');
        dispatch(actions.setIsPlay(!isPlay))
        if(isPlay){
            audioController.pause()
            return
        }
        if(!source){
            let res1 = await apis.getSongMp3(currentSong)
            if(res1?.data.err === 0) setSource(res1.data.data[128])
            audioController.src = res1.data.data[128]
        }
        if(!audioController.src) audioController.src = source
        audioController.play()
    }

    const getFormatTime = (time) => {
        // console.log('check time:', time);
        let minute = Math.round(time/60) 
        let second = Math.round(time%60) 
        if(second < 10) second = '0' + second
        return `${minute}:${second}`
    }

    return(
        <div className="px-6 py-3 h-full flex justify-between items-center">
            <div className="h-full w-full flex items-center gap-3">
                <div className="h-full w-[30%] rounded-md flex gap-3 items-center">
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
                    <div className="flex select-none">
                        <span className="text-sm text-gray-500">{timeCur}</span>
                        <span className="mx-3">----------------------------</span>
                        <span className="text-sm">{audioController?.duration ? getFormatTime(audioController?.duration) : ''}</span>
                    </div>
                </div>
                <div className="w-[30%]">
                    abc
                </div>
            </div>
        </div>
    )
}

export default Player