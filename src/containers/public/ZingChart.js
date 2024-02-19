import {Chart} from 'chart.js/auto'
import { useEffect, useRef, useState } from "react";
import { getChart } from "../../apis";
import SongRelease from "../../components/SongRelease";
import {Line} from 'react-chartjs-2'
import _ from 'lodash'
import { Link } from "react-router-dom";
import Song from '../../components/Song';
import { Loading } from '../../components';

const ZingChart = () => {
    const [chartData, setChartData] = useState(null)
    const [weekChart, setWeekChart] = useState(null)
    const [showFull, setShowFull] = useState(false)
    const [data, setData] = useState()
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
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore,
                border: {dash: [2, 6]}
            },
            x: {
                ticks: {color: 'gray'},
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
                            data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour%2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i]
                        })
                    }
                    const result = counters.find(item => item.data.some(num => num == context.tooltip.body[0]?.lines[0]?.replace('.', '')))
                    if(result.encodeId !== selected?.songSelected){
                        // console.log(rank.findIndex(item => item.encodeId === selected));
                        setSelected({
                            songSelected: result.encodeId,
                            pos: chartData?.RTChart?.items?.findIndex(item => item.encodeId === result.encodeId)
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
        const fetchChart = async() => {
            const res = await getChart()
            if(res.data.err === 0){
                console.log(res.data.data);
                setChartData(res.data.data)
                let arr = []
                res.data.data && Object.entries(res.data.data.weekChart).forEach(([key, value]) => {
                    arr.push(value)
                })
                setWeekChart(arr)
            } 
        }
        fetchChart()
    }, [])

    useEffect(() => {
        const chart = chartData?.RTChart?.chart
        const labels = chart?.times.filter(item => +item.hour%2 === 0)?.map(item => item.hour + ':00')
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
    }, [chartData])

    return(
        <>
        {!chartData ? <Loading/> :
        <div className="">
            <h1 className="my-6 font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-400 inline-block text-transparent text-4xl bg-clip-text">#zingchart</h1>
            <div className="flex flex-col gap-y-4 my-3">
                <div className="w-full min-h-[300px] relative">
                    {data &&
                        <Line
                            ref={chartRef}
                            options={options}
                            data={data}
                        />
                    }
                    <div style={{ top: tooltip.top, left: tooltip.left, opacity: tooltip.opacity, position: 'absolute' }}
                        className='tooltip z-50'
                    >
                        <SongRelease
                            song={chartData?.RTChart?.items?.find(item => item.encodeId === selected.songSelected)}
                            text={'text-white'}
                            bg={selected?.pos === 0 ? 'bg-[#4a90e2]' :
                                selected?.pos === 1 ? 'bg-[#50e3c2]' : 'bg-[#e35050]'
                            }
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center">
                    {chartData?.RTChart?.items?.map((item, index) => (
                        <div key={item.encodeId} className={`bg-[#ffffff21] rounded-md px-3 hover:bg-[#ffffff4a] ${selected?.songSelected === item.encodeId && 'bg-[#ffffff4a]'}`}>
                            {index < (showFull ? 100 : 10) && <Song song={item} isAlbum={1} order={index + 1}/> }
                        </div>
                    ))}
                    <div className='w-full flex justify-center mt-5'>
                        <button onClick={() => setShowFull(!showFull)} className='border border-active px-4 py-2 rounded-full hover:bg-[#ffffff68]'>{showFull ? 'Ẩn Top 100' : 'Xem Top 100'}</button>
                    </div>
                </div>
            </div>
            
            <div className='bg-[#c3cccd] w-[calc(100vw-64px)] lg:w-[calc(100vw-240px)] -translate-x-12 px-12 py-4'>
            <h1 className='text-4xl font-bold capitalize text-active mt-12'>Bảng xếp hạng tuần</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-6'>
                {weekChart?.map((item, index) => (
                    <div key={index} className='p-2 bg-[#ffffff6a] rounded-xl w-full'>
                        <h1 className='text-2xl font-bold text-active ml-10 my-4'>{item.country === 'vn' ? 'Việt Nam' : item.country === 'us' ? 'US - UK' : 'K-Pop'}</h1>
                        {item?.items?.map((item, index) => (
                            index < 5 && <Song key={item.encodeId} song={item} order={index+1}/>
                        ))}
                        <Link to={item.link.split('.')[0]} className='w-full flex justify-center'>
                            <button className='px-4 py-2 mt-3 rounded-full border-active border mx-auto hover:bg-[#ffffffb4]'>Xem tất cả</button>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
        }
        </>
    )
}

export default ZingChart