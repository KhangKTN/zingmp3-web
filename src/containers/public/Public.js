import { Outlet } from 'react-router-dom'
import { Player, SidebarLeft, SidebarRight } from '../../components'
import { Header } from '../../components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

const Public = () => {
    const [isShowRSidebar, setIsShowRSidebar] = useState(false)

    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='w-full h-full flex flex-auto bg-primary'>
                <div className='lg:w-[240px] w-16 min-h-full flex-none lg:bg-sidebar bg-sidebar-hidden'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto max-h-[calc(100vh-90px)] overflow-y-auto'>
                    <Header />
                    <div className='px-12'>
                        <Outlet />
                        <ToastContainer
                            position='top-center'
                            autoClose={3500}
                            limit={1}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover
                            theme='dark'
                        />
                    </div>
                </div>
                <div
                    className={`w-[330px] overflow-y-auto shadow-xl fixed z-50 right-0 top-0 bottom-0 ${
                        !isShowRSidebar && 'hidden'
                    } wide:block animate-slide-left flex-none bg-primary`}
                >
                    <SidebarRight />
                </div>
            </div>
            <div className='flex-none h-[90px] z-50 bg-player'>
                <Player isShowRSidebar={isShowRSidebar} setIsShowRSidebar={setIsShowRSidebar} />
            </div>
        </div>
    )
}

export default Public
