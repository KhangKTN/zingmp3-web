import { NavLink, Outlet, useSearchParams} from "react-router-dom"
import path from "../../ultis/path"

const act = 'text-active uppercase font-semibold'
const noAct = 'uppercase text-gray-600 font-semibold'

const Search = () => {
    const [query] = useSearchParams()

    return(
        <div>
            <div className="flex items-center py-3 border-b-[1px] border-gray-400">
                <span className="font-bold text-2xl pr-3 border-r-2 border-gray-400">Kết quả tìm kiếm</span>
                <div className="flex gap-5 mx-10">
                    <NavLink className={({isActive}) => isActive ? act : noAct} to={`${path.ALL}?q=${query.get('q')}`}>Tất cả</NavLink>
                    <NavLink className={({isActive}) => isActive ? act : noAct} to={`${path.SONG}?q=${query.get('q')}`}>Bài hát</NavLink>
                    <NavLink className={({isActive}) => isActive ? act : noAct} to={`${path.SEARCH_PLAYLIST}?q=${query.get('q')}`}>Playlist</NavLink>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Search