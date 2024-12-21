import { icons } from './icon'

const {
    FaRegChartBar,
    FaRegDotCircle,
    IoMusicalNotes,
    PiStarLight,
    PiMusicNotesPlusDuotone,
    TbCategory,
    IoRadioSharp
} = icons

export const sidebarLeftMenu = [
    {
        path: '',
        text: 'Khám phá',
        // end: true,
        icon: <FaRegDotCircle className='w-[24px] h-auto' />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <FaRegChartBar className='w-[24px] h-auto' />
    },
    {
        path: 'follow',
        text: 'Radio',
        icon: <IoRadioSharp className='w-[24px] h-auto' />
    },
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <IoMusicalNotes className='w-[24px] h-auto' />
    },
    {
        path: 'moi-phat-hanh',
        text: 'BXH Nhạc Mới',
        icon: <PiMusicNotesPlusDuotone className='w-[24px] h-auto' />
    },
    {
        path: 'hub',
        text: 'Chủ đề & Thể loại',
        icon: <TbCategory className='w-[24px] h-auto' />
    },
    {
        path: 'top100',
        text: 'Top 100',
        icon: <PiStarLight className='w-[24px] h-auto' />
    }
]