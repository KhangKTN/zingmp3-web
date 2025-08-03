import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getArtistAlbum, getArtistSong } from '../../apis/home.api'
import { Loading } from '../../components'
import Song from '../../components/Song'

const ArtistSong = () => {
    const location = useLocation()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const fetchArtistSong = async () => {
            let name = ''
            if (location.pathname.includes('nghe-si')) name = location.pathname.split('/')[2]
            else name = location.pathname.split('/')[1]
            const res = await getArtistAlbum(name)
            if (res.data.err === 0) {
                let resSongs = await getArtistSong(res.data.data.id)
                console.log(resSongs)
                setSongs(resSongs.data.data.items)
            }
        }
        fetchArtistSong()
    }, [location])
    return (
        <>
            {songs.length === 0 && <Loading />}
            <div className='flex flex-col min-h-full'>
                {songs.length !== 0 && (
                    <div>
                        <h1 className='font-bold text-xl capitalize mt-12 mb-4'>Tất cả bài hát</h1>
                        {songs?.map((item) => (
                            <Song key={item.encodeId} song={item} isAlbum={1} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ArtistSong
