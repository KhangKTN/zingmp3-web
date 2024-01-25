import { Outlet } from "react-router-dom"
import { Player, SidebarLeft, SidebarRight } from "../../components"
import { Header } from "../../components"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Public = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-full flex flex-auto bg-primary">
                <div className="lg:w-[240px] w-16 min-h-full flex-none bg-sidebar">
                    <SidebarLeft/>
                </div>
                <div className="flex-auto max-h-[calc(100vh-90px)] overflow-y-auto">
                    <Header/>
                    <div className="px-12 max-h-full">
                        <Outlet/>
                        <ToastContainer 
                            position="top-center"
                            autoClose={3500}
                            limit={1}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </div>
                <div className="w-[100px] wide:block hidden wide:animate-slide-left flex-none bg-sidebar">
                    <SidebarRight/>
                </div>
            </div>
            <div className="flex-none h-[90px] bg-player">
                <Player/>
            </div>
        </div>
    )
}

export default Public