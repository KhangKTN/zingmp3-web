import { useEffect, useState } from 'react'
import { icons } from '../ultis/icon'
import { useLocation, useNavigate } from 'react-router-dom'
import path from '../ultis/path'
const { IoIosSearch } = icons

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const handleSearch = async e => {
        if (e.keyCode === 13) {
            navigate(`${path.SEARCH}/${path.ALL}?q=${keyword}`)
        }
    }

    useEffect(() => {
        if (!location.pathname.includes(`${path.SEARCH}`)) {
            setKeyword('')
        }
    }, [location])

    return (
        <div className='flex items-center w-[440px]'>
            <span className='bg-[#ffffff66] px-1 h-10 box-border rounded-s-3xl pt-1 text-gray-400'>
                <IoIosSearch className='size-8' />
            </span>
            <input
                className='w-full h-10 outline-none bg-[#ffffff66] rounded-e-3xl'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                onChange={event => setKeyword(event.target.value)}
                onKeyUp={handleSearch}
                value={keyword}
            />
        </div>
    )
}

export default SearchBar
