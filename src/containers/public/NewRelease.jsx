import { NavLink, Outlet } from 'react-router-dom'
import path from '../../ultis/path'

const act = 'border-b-[2px] px-3 border-active h-full'
const noAct = 'px-3 h-full'

const NewRelease = () => {
    return (
        <div>
            <h1 className='py-12 capitalize text-4xl font-bold tracking-wide'>Mới phát hành</h1>
            <div className='flex h-[40px] items-center border-b-[1px] border-gray-400'>
                <NavLink className={({ isActive }) => (isActive ? act : noAct)} to={`${path.NR_SONG}`}>
                    Bài hát
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? act : noAct)} to={path.NR_ALBUM}>
                    Album
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default NewRelease
