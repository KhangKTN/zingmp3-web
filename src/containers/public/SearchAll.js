import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { search } from '../../apis'
import { AlbumItem, Artists, Loading } from '../../components'
import SongRelease from '../../components/SongRelease'
import Song from '../../components/Song'
import { icons } from '../../ultis/icon'
import path from '../../ultis/path'
import _ from 'lodash'

const { IoIosArrowForward } = icons

const SearchAll = () => {
    const [searchData, setSearchData] = useState({})
    const [query] = useSearchParams()

    useEffect(() => {
        const handleSearch = async () => {
            const res = await search(query.get('q'))
            if (res.data.err === 0) setSearchData(res.data.data)
        }
        handleSearch()
    }, [query])

    const convertFollower = follower => {
        let result = ''
        if (follower >= 1000000) result = Math.round(follower / 100000) / 10 + 'M'
        else if (follower >= 1000) result = Math.round(follower / 100) / 10 + 'K'
        else result = follower
        return result
    }

    return (
        <>
            {_.isEmpty(searchData) ? (
                <Loading />
            ) : (
                <div>
                    <div>
                        <h1 className='text-xl font-bold mt-6 my-4'>Nổi bật</h1>
                        <div className='grid grid-cols-3 gap-5'>
                            {searchData?.artists?.map(
                                (item, index) =>
                                    index < 2 && (
                                        <div
                                            key={item.id}
                                            className='flex gap-3 items-center cursor-pointer rounded-lg bg-[#d7e1e1] p-3 hover:bg-sidebar group'
                                        >
                                            <div className='size-[84px] overflow-hidden rounded-full'>
                                                <img
                                                    className='size-[84px] group-hover:scale-105 transition-all'
                                                    src={item.thumbnail}
                                                ></img>
                                            </div>
                                            <Link to={item.link}>
                                                <div className='flex flex-col gap-1'>
                                                    <span className='text-gray-500 font-light text-sm'>
                                                        {item.isOA && 'Nghệ sĩ'}
                                                    </span>
                                                    <span className='font-semibold mt-1 text-[15px] hover:text-active hover:underline'>
                                                        {item.name}
                                                    </span>
                                                    <span className='text-gray-500 font-light text-sm'>
                                                        {convertFollower(item.totalFollow)} quan tâm
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                            )}
                            {searchData?.songs?.map(
                                (item, index) =>
                                    index === 0 && (
                                        <SongRelease key={item.encodeId} bg={'bg-[#d7e1e1]'} song={item} hover={1} />
                                    )
                            )}
                        </div>
                    </div>
                    <div className='mt-12'>
                        <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3 max-h-[255px] overflow-y-hidden'>
                            {searchData?.playlists?.map(
                                (item, index) => index < 5 && <AlbumItem key={item.encodeId} item={item} />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between mt-12 mb-4'>
                            <h1 className='text-xl font-bold'>Bài Hát</h1>
                            <Link to={`/${path.SEARCH}/${path.SONG}?${query}`}>
                                <div className='flex items-center text-gray-500 cursor-pointer hover:text-active'>
                                    <button className=''>TẤT CẢ</button>
                                    <IoIosArrowForward className='size-5 ml-3' />
                                </div>
                            </Link>
                        </div>
                        <div className='grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-[2px] w-full max-h-[342px] overflow-hidden mt-3'>
                            {searchData?.songs?.map(item => (
                                <Song key={item.encodeId} song={item} />
                            ))}
                        </div>
                    </div>
                    <Artists artists={searchData?.artists} />
                </div>
            )}
        </>
    )
}

export default SearchAll
