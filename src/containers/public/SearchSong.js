import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import {search, getArtistSong} from '../../apis'
import Song from "../../components/Song";

const SearchSong = () => {
    const [query] = useSearchParams()
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        const handleSearch = async() => {
            const resSearch = await search(query.get('q'))
            console.log(resSearch);
            let key = resSearch?.data?.data?.top?.id
            const resSong = await getArtistSong(key)
            console.log(resSong);
            if(resSearch.data.err === 0) setSearchData(resSong?.data?.data?.items)
        }
        handleSearch()
    }, [query])

    return(
        <div className="flex flex-col">
            <h1 className="text-xl font-bold my-6">Bài hát</h1>
            {searchData?.map((item) => ( 
                <Song key={item?.encodeId} song={item} isAlbum={1} />
            ))} 
        </div>
    )
}

export default SearchSong