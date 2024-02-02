import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Album, Home, Login, MyMusic, Playlist, Public, Top100, WeekZingChart } from './containers/public/';
import { Routes, Route } from 'react-router-dom';
import path from './ultis/path';
import * as actions from './store/actions'
import ScrollToTop from './ScrollTop';


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getHomePage())
    }, [])

    return (
        <div>
            <ScrollToTop/>
            <Routes>
                <Route path={path.PUBLIC} element={<Public/>}>
                    <Route path={path.HOME} element={<Home/>}/>
                    <Route path={path.LOGIN} element={<Login/>}/>
                    <Route path={path.MY_MUSIC} element={<MyMusic/>}/>
                    <Route path={path.ALBUM} element={<Album/>}/>
                    <Route path={path.PLAYLIST} element={<Playlist/>}/>
                    <Route path={path.ZINGCHART} element={<WeekZingChart/>}/>
                    <Route path={path.TOP100} element={<Top100/>}/>

                    <Route path={path.STAR} element={<Home />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
