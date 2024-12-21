import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { icons } from '../ultis/icon'
import { AlbumItem } from '../components'

const { IoIosArrowForward } = icons

const Top100 = () => {
    const { top100 } = useSelector(state => state.app)

    return (
        <div className='mt-12'>
            <div className='flex justify-between'>
                <h1 className='text-2xl capitalize font-semibold'>{top100[0]?.title}</h1>
                <Link to={'/top100'} className='text-gray-500 text-sm hover:text-active flex items-center'>
                    TẤT CẢ
                    <IoIosArrowForward className='size-5 ml-3' />
                </Link>
            </div>
            <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3 max-h-[255px] overflow-y-hidden'>
                {top100[0]?.items?.length > 0 &&
                    top100[0]?.items?.map(item => <AlbumItem key={item.encodeId} item={item} />)}
            </div>
        </div>
    )
}

export default Top100
