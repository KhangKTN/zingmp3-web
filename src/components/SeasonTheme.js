import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const SeasonTheme = () => {
    const { seasonTheme } = useSelector(state => state.app)
    const [seasonData, setData] = useState({})

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        seasonTheme && setData(seasonTheme)
    }, [seasonTheme, pathname])

    return (
        <>
            {seasonData?.length > 0 &&
                seasonData.map((item, index) => (
                    <div key={item.sectionId} className='mt-12 w-full'>
                        <h1 className='text-2xl capitalize font-semibold'>{item?.title}</h1>
                        <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3'>
                            {item?.items?.length > 0 &&
                                item?.items?.map(item => (
                                    <Link key={item.link} to={item.link?.split('.')[0]}>
                                        <div key={item.encodeId} className='group'>
                                            <div className='w-full overflow-hidden hover:opacity-80 rounded-lg'>
                                                <img
                                                    className='w-full cursor-pointer group-hover:scale-110 transition-all duration-500'
                                                    src={item.thumbnail}
                                                    alt='thumbnail'
                                                ></img>
                                            </div>
                                            <h1 className='mt-1 text-gray-600 group-hover:text-active cursor-pointer'>
                                                {item?.title}
                                            </h1>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
        </>
    )
}

export default memo(SeasonTheme)
