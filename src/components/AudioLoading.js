import { Audio } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const AudioLoading = () => {
    const {isPlay} = useSelector(state => state.music)

    return(
        <Audio
            height="40"
            width="40"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="border-[1px] border-white rounded-full p-2"
            visible={isPlay}
        />
    )
}

export default AudioLoading