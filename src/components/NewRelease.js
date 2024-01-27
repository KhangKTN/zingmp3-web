import { useEffect, useState } from "react"
import * as apis from '../apis'
import { useSelector } from "react-redux"

const NewRelease = () => {
    const {newRelease} = useSelector(state => state.app)
    const [data, setData] = useState({})

    useEffect(() => {
        newRelease && setData(newRelease[0])
    }, [newRelease])

    return(
        <div className="mt-12 w-full">
            <h1 className="text-2xl capitalize font-semibold">{data?.title}</h1>
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3">
                {/* {data?.items?.map(item => (
                    <div key={item.encodeId} className="">
                        <div className="w-full overflow-hidden  hover:opacity-80 rounded-lg">
                            <img className="w-full cursor-pointer hover:scale-110 transition-all duration-300" src={item.thumbnail}></img>
                        </div>
                        <h1 className="mt-1">{item?.title}</h1>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default NewRelease