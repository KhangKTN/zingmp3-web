import {icons} from '../ultis/icon'

const {IoMdHeartEmpty, BsThreeDots, IoPlayCircleOutline} = icons

const HoverAlbum = () => {
    return(
        <div className='flex gap-3 absolute items-center transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='p-2 rounded-full hover:bg-[#ffffff3d]'>
                <IoMdHeartEmpty className='size-8 text-white'/>
            </span>
            <IoPlayCircleOutline className='size-12 text-white'/>
            <span className='p-2 rounded-full hover:bg-[#ffffff3d]'>
                <BsThreeDots className='size-8 text-white'/>
            </span>
        </div>
    )
}

export default HoverAlbum