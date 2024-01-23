import logo from '../assets/logo.svg'
import logoSmall from '../assets/logo-small.svg'
import { sidebarLeftMenu } from '../ultis/menu'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../ultis/path'
import { document } from 'postcss'

const active = 'py-3 px-4 bg-active text-active border-l-4 border-active'
const notActive = 'py-3 px-4 hover:bg-active hover:text-active border-l-4'

const SidebarLeft = () => {
    const navigate = useNavigate()

    return(
        <div className="flex flex-col h-full">
            <div className='px-6'>
                <img onClick={() => navigate(path.HOME)} className='w-[120px] h-[70px] object-contain cursor-pointer' src={logo} alt="Logo" />
            </div>
            <div className='flex flex-col'>
                {sidebarLeftMenu.map((item, index) => (
                    <NavLink key={item.path} to={item.path} className={({isActive}) => isActive ? active : notActive}>
                        <div className='flex items-center gap-4'>
                            <span>{item.icon}</span>
                            <span className='hidden animate-text-animate lg:inline'>{item.text}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft