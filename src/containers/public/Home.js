import { useSelector } from "react-redux"
import { Loading, NewRelease, SeasonTheme, Slider, Top100, WeekChart, ZingChart } from "../../components"
import { useState } from "react"


const Home = () => {
    const [isLoading, setLoading] = useState(false)

    return(
        <>
        {isLoading ? <Loading/> :
        <div className="h-full">
            <div className="h-full">
                <Slider/>
                <NewRelease setLoading={setLoading}/>
                <SeasonTheme/>
                <ZingChart setLoading={setLoading}/>
                <WeekChart/>
                <Top100/>
            </div>
        </div>
        }
        </>
    )
}

export default Home