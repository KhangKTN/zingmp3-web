import { icons } from "./icon"

const {MdOutlineLibraryMusic, FaRegChartBar, FaRegDotCircle, IoMusicalNotes} = icons

export const sidebarLeftMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <IoMusicalNotes className="w-[24px] h-auto"/>
    },
    {
        path: '',
        text: 'Khám phá',
        // end: true,
        icon: <FaRegDotCircle className="w-[24px] h-auto"/>
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <FaRegChartBar className="w-[24px] h-auto"/>
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <MdOutlineLibraryMusic className="w-[24px] h-auto"/>
    }
]