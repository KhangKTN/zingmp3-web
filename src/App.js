import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Album, AllSearch, Home, Login, MyMusic, Playlist, Public, Search, SongSearch, Top100, WeekZingChart } from './containers/public/';
import { Routes, Route } from 'react-router-dom';
import path from './ultis/path';
import * as actions from './store/actions'


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getHomePage())
    }, [])

    return (
        <div>
            <Routes>
                <Route path={path.PUBLIC} element={<Public/>}>
                    <Route path={path.HOME} element={<Home/>}/>
                    <Route path={path.LOGIN} element={<Login/>}/>
                    <Route path={path.MY_MUSIC} element={<MyMusic/>}/>
                    <Route path={path.ALBUM} element={<Album/>}/>
                    <Route path={path.PLAYLIST} element={<Album/>}/>
                    <Route path={path.ZINGCHART} element={<WeekZingChart/>}/>
                    <Route path={path.TOP100} element={<Top100/>}/>
                    <Route path={path.SEARCH} element={<Search/>}>
                        <Route path={path.ALL} element={<AllSearch/>}/>
                        <Route path={path.SONG} element={<SongSearch/>}/>
                    </Route>

                    <Route path={path.STAR} element={<Home />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
