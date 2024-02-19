import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { SongList } from "../../components"
import Song from "../../components/Song"
import { Link, useSearchParams } from "react-router-dom"

const arr = [
    {key: 'all', value: 'Tất cả', link: '?filter=all'},
    {key: 'vPop', value: 'Việt Nam', link: '?filter=vpop'}, 
    {key: 'others', value: 'Khác', link: '?filter=others'}
]

const NR_Song = () => {
    const {newRelease} = useSelector(state => state.app)
    const [selected, setSelected] = useState(arr && arr[0])
    const [data, setData] = useState({})

    const [query] = useSearchParams()
    

    useEffect(() => {
        setData(newRelease && newRelease[0])
        if(!query?.get('filter')) setSelected(arr[0])
        else setSelected(arr[arr.findIndex(item => query.get('filter').includes(item.key.toLowerCase()))])
    }, [query, newRelease])

    return(
        <div>
            <div className="flex gap-x-6 mt-4">
            {arr?.map((item) => (
                <Link key={item?.key} to={item.link}><h1 onClick={() => setSelected(item)} className={`rounded-full px-5 w-fit py-1 border border-gray-400 cursor-pointer ${selected === item && 'bg-slider-bar text-white'}`}>{item.value}</h1></Link>
            ))}
            </div>
            <div>
                <div className="w-full h-full flex flex-col mt-5">
                    <div className="flex w-full h-full gap-10 text-gray-500 font-medium uppercase p-3">
                        <span className="w-[50%]">Bài hát</span>
                        <span className="flex-auto">Album</span>
                        <span className="flex-auto text-right">Thời gian</span>
                    </div>
                    <div className="flex flex-col min-h-full">
                        {data && data.items && data?.items[selected?.key]?.map((item) => (
                            <Song key={item.encodeId} song={item} isAlbum={1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NR_Song