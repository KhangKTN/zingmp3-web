import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import {
    Album,
    Artist,
    ArtistSong,
    Home,
    Login,
    MyMusic,
    NewRelease,
    NrAlbum,
    NrSong,
    Public,
    Search,
    SearchAlbum,
    SearchAll,
    SearchSong,
    Top100,
    WeekRank,
    ZingChart
} from './containers/public/'
import * as actions from './store/actions'
import path from './ultis/path'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getHomePage())
    }, [dispatch])

    return (
        <div>
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.MY_MUSIC} element={<MyMusic />} />
                    <Route path={path.ALBUM} element={<Album />} />
                    <Route path={path.PLAYLIST} element={<Album />} />
                    <Route path={path.ZINGCHART} element={<ZingChart />} />
                    <Route path={path.ZINGCHART_TUAN} element={<WeekRank />} />
                    <Route path={path.TOP100} element={<Top100 />} />
                    <Route path={path.SEARCH} element={<Search />}>
                        <Route path={path.ALL} element={<SearchAll />} />
                        <Route path={path.SONG} element={<SearchSong />} />
                        <Route path={path.SEARCH_PLAYLIST} element={<SearchAlbum />} />
                    </Route>
                    <Route path={path.ARTIST} element={<Artist />}></Route>
                    <Route path={path.ARTIST_1} element={<Artist />}></Route>
                    <Route path={path.ARTIST_SONG} element={<ArtistSong />}></Route>
                    <Route path={path.NEW_RELEASE} element={<NewRelease />}>
                        <Route path={path.NR_SONG} element={<NrSong />} />
                        <Route path={path.NR_ALBUM} element={<NrAlbum />} />
                    </Route>

                    <Route path={path.STAR} element={<Home />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
