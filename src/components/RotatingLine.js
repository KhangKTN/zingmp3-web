import { memo } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const RotatingLine = () => {
    return (
        <span className='size-8 m-1 rounded-full border-2 border-black flex items-center justify-center'>
            <RotatingLines
                visible={true}
                height="20"
                width="20"
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </span>
    )
}

export default memo(RotatingLine) 