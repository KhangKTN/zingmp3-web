import {Chart} from 'chart.js/auto'
import { memo, useEffect, useRef, useState } from 'react'
import {Line} from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import SongRelease from './SongRelease'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import path from '../ultis/path'

const ZingChart = () => {
    const [data, setData] = useState()
    const {chart, rank} = useSelector(state => state.app)
    const [tooltip, setTooltip] = useState({opacity: 0, top: 0, left: 0})
    const [selected, setSelected] = useState({songSelected: '', pos: 0})
    const chartRef = useRef()

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {display: false},
                grid: {color: 'gray', drawTicks: false},
                min: chart?.minScore,
                max: chart?.maxScore,
                border: {dash: [2, 6]}
            },
            x: {
                ticks: {color: 'pink'},
                grid: {color: 'transparent'}
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: context => {
                    if(!chartRef || !chartRef.current) return
                    if(context.tooltip.opacity === 0){
                        if(tooltip.opacity !== 0) setTooltip(prev => ({...prev, opacity: 0}))
                        return
                    }
                    const counters = []
                    for(let i = 0; i < 3; i++){
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour%2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chart?.items)[i]
                        })
                    }
                    const result = counters.find(item => item.data.some(num => num == context.tooltip.body[0]?.lines[0]?.replace('.', '')))
                    // console.log(result);
                    if(result.encodeId !== selected?.songSelected){
                        // console.log(rank.findIndex(item => item.encodeId === selected));
                        setSelected({
                            songSelected: result.encodeId,
                            pos: rank.findIndex(item => item.encodeId === result.encodeId)
                        })
                    }
                    const newTooltip = {
                        opacity: 1, 
                        left: context.tooltip.caretX, 
                        top: context.tooltip.caretY
                    }
                    if(!_.isEqual(tooltip, newTooltip)) setTooltip(newTooltip)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
      };

    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour%2 === 0)?.map(item => item.hour + ':00')
        const datasets = []
        if(chart?.items){
            for(let i = 0; i < 3; i++){
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour%2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 1.5,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 3
                })
            }
        }
        setData({labels, datasets})
    }, [chart])

    return(
        <div className="bg-gradient-to-tr from-[#522173] to-[#672c8d] p-5 rounded-lg mt-12">
            <h1 className="font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-400 inline-block text-transparent text-2xl bg-clip-text">#zingchart</h1>
            <div className="flex w-full flex-col xl:flex-row h-[90%] my-3">
                <div className="xl:w-[40%] mt-10 xl:mt-0 w-full flex flex-col gap-3 justify-center order-2 xl:order-1">
                    {rank?.filter((item, index) => index < 3).map((item, index) => (
                        <div key={item.encodeId} className={`bg-[#ffffff21] rounded-md px-3 hover:bg-[#ffffff4a] ${selected?.songSelected === item.encodeId && 'bg-[#ffffff4a]'}`}>
                            <SongRelease song={item} text={'text-white'} order={index+1} percent={item?.score / chart?.totalScore} hover={0}/> 
                        </div>
                    ))}
                    <Link to={path.ZINGCHART}>
                        <button className='outline outline-offset-2 outline-1 mx-auto block hover:bg-[#ffffff73] rounded-full text-white px-5 py-1'>Xem thêm</button>
                    </Link>
                </div>
                <div className="xl:w-[60%] w-full order-1 xl:order-2 relative">
                    {data && 
                        <Line
                            ref={chartRef}
                            options={options}
                            data={data}
                        />
                    }
                    <div style={{top: tooltip.top, left: tooltip.left, opacity: tooltip.opacity, position: 'absolute'}} 
                        className='tooltip z-50'
                    >
                        <SongRelease
                            song={rank?.find(item => item.encodeId === selected.songSelected)}
                            text={'text-white'}
                            bg={selected?.pos === 0 ? 'bg-[#4a90e2]' :
                                selected?.pos === 1 ? 'bg-[#50e3c2]' : 'bg-[#e35050]'
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ZingChart)