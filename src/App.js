import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Album, Home, Login, MyMusic, Playlist, Public } from './containers/public/';
import { Routes, Route } from 'react-router-dom';
import path from './ultis/path';
import * as actions from './store/actions'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getHomePage())
    }, [])

    return (
        <div className="">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />}/>
                    <Route path={path.LOGIN} element={<Login />}/>
                    <Route path={path.MY_MUSIC} element={<MyMusic/>}/>
                    <Route path={path.ALBUM} element={<Album/>}/>
                    <Route path={path.PLAYLIST} element={<Playlist/>}/>

                    <Route path={path.STAR} element={<Home />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
