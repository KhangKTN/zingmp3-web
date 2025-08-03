import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { sidebarLeftMenu } from '../ultis/menu'
import path from '../ultis/path'

const active = 'py-3 px-4 bg-active text-active border-l-0 lg:border-l-4 lg:border-active'
const notActive = 'py-3 px-4 hover:bg-active hover:text-active lg:border-l-4'

const SidebarLeft = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col h-full'>
            <div className='px-6'>
                <img
                    onClick={() => navigate(path.HOME)}
                    className='w-[120px] h-[70px] object-contain cursor-pointer'
                    src={logo}
                    alt='Logo'
                />
            </div>
            <div className='flex flex-col'>
                {sidebarLeftMenu.map((item, index) => (
                    <React.Fragment key={item.path}>
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => (isActive ? active : notActive)}
                        >
                            <div className='flex items-center gap-4 justify-center lg:justify-start'>
                                <span>{item.icon}</span>
                                <span className='hidden animate-text-animate lg:inline'>{item.text}</span>
                            </div>
                        </NavLink>
                        {index === 3 && <div className='h-[1px] bg-gray-400 my-6 mx-4'></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft
