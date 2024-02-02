import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const WeekChart = () => {
    const {weekChart} = useSelector(state => state.app)

    return(
        <div className="mt-12 grid grid-cols-3 gap-5">
            {weekChart[0]?.items?.map((item) => (
                <div key={item.link} className="w-full rounded-lg overflow-hidden cursor-pointer">
                    <Link to={item.link.split('.')[0]}>
                        <img className="w-full h-[100px] object-cover hover:scale-110 transition-all duration-500" src={item.banner}/>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default WeekChart