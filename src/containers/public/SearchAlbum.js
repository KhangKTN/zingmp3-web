import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getArtistAlbum, search } from '../../apis'
import AlbumItem from '../../components/AlbumItem'
import Loading from '../../components/Loading'

const SearchAlbum = () => {
    const [query] = useSearchParams()
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        const handleSearch = async () => {
            const resSearch = await search(query.get('q'))
            let name = resSearch?.data?.data?.top?.alias
            const resSong = await getArtistAlbum(name)
            if (resSearch.data.err === 0) setSearchData(resSong?.data?.data?.sections)
        }
        handleSearch()
    }, [query])

    return (
        <>
            {searchData?.length === 0 ? (
                <Loading />
            ) : (
                <div>
                    <h1 className='font-bold text-xl my-6'>Playlist/Album</h1>
                    <div className='grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3'>
                        {searchData?.map(
                            item =>
                                item?.sectionType === 'playlist' && item.items.map(item => <AlbumItem item={item} />)
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchAlbum
