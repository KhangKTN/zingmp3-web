import { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from '../store/actions'
import { useNavigate } from "react-router-dom"

const SeasonTheme = () => {
    const {seasonTheme} = useSelector(state => state.app)
    const [seasonData, setData] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        seasonTheme && setData(seasonTheme[0])
    }, [seasonTheme])
    
    const handleClick = (item) => {
        // if(item?.type === 1){
        //     dispatch(actions.setCurrentSong(item.encodeId))
        //     dispatch(actions.setIsPlay(true))
        //     dispatch(actions.setList())
        // }
            let link = item.link?.split('.')[0]
            console.log(link);
            navigate(link)
    }

    return(
        <div className="mt-12 w-full">
            <h1 className="text-2xl capitalize font-semibold">{seasonData?.title}</h1>
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-5 w-full mt-3">
                {seasonData?.items?.length > 0 && seasonData?.items?.map(item => (
                    <div onClick={() => handleClick(item)} key={item.encodeId} className="group">
                        <div className="w-full overflow-hidden hover:opacity-80 rounded-lg">
                            <img className="w-full cursor-pointer group-hover:scale-110 transition-all duration-300" src={item.thumbnail}></img>
                        </div>
                        <h1 className="mt-1 text-gray-600 group-hover:text-active cursor-pointer">{item?.title}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(SeasonTheme)