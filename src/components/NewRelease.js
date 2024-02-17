import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SongRelease from "./SongRelease";
import {icons} from '../ultis/icon'
import { Link } from "react-router-dom";
import path from "../ultis/path";

const {IoIosArrowForward} = icons

const NewRelease = () => {
    const [data, setData] = useState({})
    const [select, setSelect] = useState('all')
    
    const {newRelease} = useSelector(state => state.app)

    const styleAct = 'px-5 py-1 border-[1px] border-slate-400 rounded-full bg-slider-bar text-slate-50'
    const styleNotAct = 'px-5 py-1 border-[1px] border-slate-400 rounded-full bg-button text-gray-600'

    useEffect(() => {
        newRelease && setData(newRelease[0])
    }, [newRelease])

    const handleChange = (value) => {
        setSelect(value)
    }

    return(
        <div className="mt-12 w-full">
            <h1 className="text-2xl capitalize font-semibold">{data?.title}</h1>
            <div className="flex justify-between items-center my-3 text-sm">
                <div className="flex gap-3">
                    <button onClick={() => handleChange('all')} className={select === 'all' ? styleAct : styleNotAct}>TẤT CẢ</button>
                    <button onClick={() => handleChange('vPop')} className={select === 'vPop' ? styleAct : styleNotAct}>VIỆT NAM</button>
                    <button onClick={() => handleChange('others')} className={select === 'others' ? styleAct : styleNotAct}>KHÁC</button>
                </div>
                <Link to={`${path.NEW_RELEASE}/${path.NR_SONG}`}>
                    <div className="flex text-gray-500 cursor-pointer hover:text-active">
                        <button className="">TẤT CẢ</button>
                        <IoIosArrowForward className="size-5 ml-3" />
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 auto-rows-3 gap-x-10 gap-y-[2px] w-full max-h-[342px] overflow-hidden mt-3">
                {data?.items && data?.items[select]?.map(item => (
                    <SongRelease key={item.encodeId} song={item} isShowDate={1} hover={1}/>
                ))}
            </div>
        </div>
    )
}

export default NewRelease