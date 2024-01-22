import logo from '../assets/logo.svg'
import { sidebarLeftMenu } from '../ultis/menu'
import { NavLink } from 'react-router-dom'

const active = 'py-3 px-4 bg-active text-active border-l-4 border-active'
const notActive = 'py-3 px-4 hover:bg-active hover:text-active border-l-4'

const SidebarLeft = () => {
    return(
        <div className="flex flex-col h-full">
            <div className='px-6'>
                <img className='w-[120px] h-[70px] object-contain' src={logo} alt="Logo" />
            </div>
            <div className='flex flex-col'>
                {sidebarLeftMenu.map((item, index) => (
                    <NavLink key={item.path} to={item.path} className={({isActive}) => isActive ? active : notActive}>
                        <div className='flex items-center gap-4'>
                            {item.icon}{item.text}
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft