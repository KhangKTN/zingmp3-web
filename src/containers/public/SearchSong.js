import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import {search, getArtistSong} from '../../apis'
import Song from "../../components/Song";
import Loading from "../../components/Loading";

const SearchSong = () => {
    const [query] = useSearchParams()
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        const handleSearch = async() => {
            const resSearch = await search(query.get('q'))
            let key = resSearch?.data?.data?.top?.id
            const resSong = await getArtistSong(key)
            if(resSearch.data.err === 0) setSearchData(resSong?.data?.data?.items)
        }
        handleSearch()
    }, [query])

    return(
        <div className="flex flex-col">
            {searchData.length === 0 ? <Loading/> :
                <div>
                    <h1 className="text-xl font-bold my-6">Bài hát</h1>
                    {searchData?.map((item) => ( 
                        <Song key={item?.encodeId} song={item} isAlbum={1} />
                    ))} 
                </div>
            }
        </div>
    )
}

export default SearchSong