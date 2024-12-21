import { Audio } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const AudioLoading = ({ w, h, border }) => {
    const { isPlay } = useSelector(state => state.music)

    return (
        <Audio
            height={h}
            width={w}
            color='white'
            ariaLabel='audio-loading'
            wrapperStyle={{}}
            wrapperClass={border && 'border-[1px] border-white rounded-full p-2'}
            visible={isPlay}
        />
    )
}

export default AudioLoading
