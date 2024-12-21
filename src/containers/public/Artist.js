import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getArtistAlbum } from '../../apis'
import { icons } from '../../ultis/icon'
import Song from '../../components/Song'
import { AlbumItem, Artists, Loading } from '../../components'

const { IoIosArrowForward } = icons

const Artist = () => {
    const location = useLocation()
    const [artist, setSearchData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            let name = ''
            if (location?.pathname.includes('nghe-si')) {
                name = location.pathname.split('/')[2]
            } else {
                name = location.pathname.split('/')[1]
            }
            let res = await getArtistAlbum(name)
            if (res.data.err === 0) {
                setSearchData(res.data.data)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [location])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className=''>
                    {/* Background */}
                    <div className='w-lvw h-[300px] relative px-12 py-5 -translate-x-[48px] -mt-[102px] flex items-end'>
                        <div className='flex gap-8 items-center z-10'>
                            <img className='rounded-full size-[140px]' src={artist?.thumbnail} alt='thumbnail-artist'></img>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-5xl font-bold'>{artist?.name}</h1>
                                <span className=''>
                                    {new Intl.NumberFormat('en-DE').format(artist?.follow)} người quan tâm
                                </span>
                            </div>
                        </div>
                        <div className='absolute top-0 right-0 bottom-0 left-0 overflow-hidden'>
                            <img className='h-full scale-[400%] mx-auto' src={artist?.thumbnail} alt='thumbnail-artist'></img>
                            <div className='absolute top-0 right-0 bottom-0 left-0 bg-[#ced9d9e6] backdrop-blur-md'></div>
                        </div>
                    </div>
                    {artist?.sections.map(item => (
                        <>
                            {item.sectionId === 'aSongs' && (
                                <div>
                                    {item.topAlbum && (
                                        <div className='w-fit mt-12'>
                                            <h1 className='text-xl font-bold mb-6'>
                                                {artist?.sections && artist?.sections[0]?.topAlbum && 'Mới phát hành'}
                                            </h1>
                                            <div className='py-3 px-5 mt-3 bg-[#c2cbcb] rounded-lg flex gap-5'>
                                                <div>
                                                    <img
                                                        className='size-28 rounded-lg'
                                                        src={
                                                            artist?.sections && artist?.sections[0]?.topAlbum?.thumbnail
                                                        }
                                                        alt='thumbnail-album'
                                                    ></img>
                                                </div>
                                                <div>
                                                    <span className='text-gray-500 text-sm'>
                                                        {artist?.sections && artist?.sections[0]?.topAlbum?.textType}
                                                    </span>
                                                    <h1 className='font-semibold'>
                                                        {artist?.sections && artist?.sections[0]?.topAlbum?.title}
                                                    </h1>
                                                    <span className='text-gray-500 text-sm'>
                                                        {artist?.sections &&
                                                            artist?.sections[0]?.topAlbum?.artistsNames}
                                                    </span>
                                                    <h1 className='text-gray-500 text-sm mt-3'>
                                                        {artist?.sections && artist?.sections[0]?.topAlbum?.releaseDate}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Show list songs */}
                                    <div className='flex items-center justify-between mt-12 mb-6'>
                                        <h1 className='text-xl font-bold'>
                                            {artist?.sections && artist?.sections[0]?.title}
                                        </h1>
                                        <Link to={`${artist?.alias}/bai-hat`}>
                                            <div className='flex items-center text-gray-500 cursor-pointer hover:text-active'>
                                                <button className=''>TẤT CẢ</button>
                                                <IoIosArrowForward className='size-5 ml-3' />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-[2px] w-full overflow-hidden mt-3'>
                                        {artist?.sections &&
                                            artist?.sections[0]?.items?.map(
                                                (item, index) => index < 6 && <Song key={item.encodeId} song={item} />
                                            )}
                                    </div>
                                </div>
                            )}
                            {item.sectionId === 'aSingle' && (
                                <div className=''>
                                    <div className='flex items-center justify-between mt-12 mb-6'>
                                        <h1 className='text-xl font-bold'>{item.title}</h1>
                                        <div className='flex items-center text-gray-500 cursor-pointer hover:text-active'>
                                            <button className=''>TẤT CẢ</button>
                                            <IoIosArrowForward className='size-5 ml-3' />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3'>
                                        {item.items.map(
                                            (item, index) =>
                                                index < 10 && <AlbumItem key={item.encodeId} item={item} single={1} />
                                        )}
                                    </div>
                                </div>
                            )}
                            {item.sectionId === 'aAlbum' && (
                                <div>
                                    <div className='flex items-center justify-between mt-12 mb-6'>
                                        <h1 className='text-xl font-bold'>{item.title}</h1>
                                    </div>
                                    <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3'>
                                        {item.items.map(
                                            (item, index) =>
                                                index < 10 && <AlbumItem key={item.encodeId} item={item} single={1} />
                                        )}
                                    </div>
                                </div>
                            )}
                            {item.sectionId === 'aPlaylist' && (
                                <div>
                                    <div className='flex items-center justify-between mt-12 mb-6'>
                                        <h1 className='text-xl font-bold'>{item.title}</h1>
                                    </div>
                                    <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3'>
                                        {item.items.map(
                                            (item, index) => index < 10 && <AlbumItem key={item.encodeId} item={item} />
                                        )}
                                    </div>
                                </div>
                            )}
                            {item.sectionId === 'aReArtist' && <Artists artists={item.items} />}
                        </>
                    ))}
                    {/* About artist */}
                    <div>
                        <h1 className='mt-12 mb-6 font-bold text-xl'>Về {artist?.name}</h1>
                        <div className='grid grid-cols-2 w-full gap-10'>
                            <img
                                className='w-full flex-auto rounded-lg h-auto object-cover'
                                src={artist?.thumbnail}
                                alt='thumbnail'
                            ></img>
                            <div className='w-full'>
                                <p className='w-full'>{artist?.biography}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Artist
