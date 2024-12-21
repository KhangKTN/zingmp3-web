import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getChart } from '../../apis'
import Loading from '../../components/Loading'
import Song from '../../components/Song'

const arr = [
    { key: 'vn', value: 'Việt Nam' },
    { key: 'us', value: 'US-UK' },
    { key: 'korea', value: 'K-Pop' }
]

const act = 'uppercase py-1 text-active border-b-[3px] border-active'
const noAct = 'uppercase py-1'

const WeekRank = () => {
    const [data, setData] = useState(null)
    const [dataRender, setDataRender] = useState(null)

    const location = useLocation()

    useEffect(() => {
        const fetchChart = async () => {
            const res = await getChart()
            if (res.data.err === 0) {
                setData(res.data.data.weekChart)
                Object.entries(res.data.data.weekChart).forEach(([key, value]) => {
                    if (value.link.includes(location.pathname)) setDataRender(value)
                })
            }
        }
        fetchChart()
    }, [])

    useEffect(() => {
        data &&
            Object.entries(data).forEach(([key, value]) => {
                if (value.link.includes(location.pathname)) setDataRender(value)
            })
    }, [location])

    return (
        <>
            {!data ? (
                <Loading />
            ) : (
                <div>
                    <h1 className='text-4xl text-active font-bold capitalize tracking-wide my-10'>
                        Bảng xếp hạng tuần
                    </h1>
                    <div className='flex text-2xl gap-x-8 mb-4 font-semibold'>
                        {arr.map(item => (
                            <NavLink
                                className={({ isActive }) => (isActive ? act : noAct)}
                                to={data && data[item.key].link.split('.')[0]}
                            >
                                <h1>{item.value}</h1>
                            </NavLink>
                        ))}
                    </div>
                    <div>
                        {dataRender?.items?.map((item, index) => (
                            <Song song={item} order={index + 1} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default WeekRank
