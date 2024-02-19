import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as actions from '../store/actions'
import { useNavigate } from "react-router-dom";

const Slider = () => {
    const [banner, setBanner] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let res = useSelector(state => state.app).banner
    
    useEffect(() => {
        if(res && res?.length > 0 && banner?.length === 0){
            setBanner(res[0].items)
        } 
        let arr = []
        const sliders = document.getElementsByClassName('slider-item')
        for(let i = 0; i < banner.length; i++){
            arr.push(i)
            if(i > 2) sliders[i].classList.add('hidden')
        }
        
        const interval = setInterval(() => {
                let ele = arr.shift()
                arr.push(ele)
                for(let i = 0; i < banner?.length; i++){
                    sliders[i].classList.remove('animate-slide-right', 'animate-slide-left', 'animate-slide-left-two', 'order-last', 'order-first', 'order-2', 'z-10', 'z-5', 'hidden')
                    // sliders[i].classList.remove('animate-slide-left', 'order-first', 'z-10', 'hidden')
                    // sliders[i].classList.remove('animate-slide-left-two', 'order-2', 'z-10', 'hidden')
                    if(i > 2){
                        sliders[arr[i]].classList.add('hidden')
                    }
                }
                for(let i = 3; i < arr.length; i++){
                    if(!sliders[arr[i]].classList.contains('hidden')) sliders[arr[i]].classList.add('hidden')
                }
                sliders[arr[2]]?.classList.add('animate-slide-right', 'order-last', 'z-5')
                sliders[arr[0]]?.classList.add('animate-slide-left', 'order-first', 'z-10')
                sliders[arr[1]]?.classList.add('animate-slide-left-two', 'order-2', 'z-10')
            }, 5000);
        return () => {
            interval && clearInterval(interval)
        }
    }, [res, banner])

    const handleClick = (item) => {
        if(item?.type === 1){
            dispatch(actions.setCurrentSong(item.encodeId))
            dispatch(actions.setIsPlay(true))
        }
        else if(item?.type === 4){
            let link = item.link?.split('.')[0]
            navigate(link)
        }
    }

    return(
        <div className="flex gap-3 animate-slide-in-elliptic-left-fwd justify-center w-full">
            {banner && banner.length > 0 && banner.map((item) => (
                <img onClick={() => handleClick(item)} key={item.encodeId} src={item.banner} className="slider-item cursor-pointer flex-1 w-[30%] rounded-xl"/>
            ))}
        </div>
    )
}

export default Slider