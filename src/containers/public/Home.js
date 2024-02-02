import { NewRelease, SeasonTheme, Slider, Top100, WeekChart, ZingChart } from "../../components"


const Home = () => {


    return(
        <div className="h-full">
            <div className="h-full">
                <Slider/>
                <NewRelease/>
                <SeasonTheme/>
                <ZingChart/>
                <WeekChart/>
                <Top100/>
            </div>
        </div>
    )
}

export default Home