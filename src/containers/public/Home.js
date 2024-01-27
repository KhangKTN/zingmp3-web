import { NewRelease, SeasonTheme, Slider } from "../../components"


const Home = () => {

    /* useEffect(() => {
        const fetchDataHome = async() => {
            const res = await getHome()
            console.log(res);
        }
        fetchDataHome();
    }, []) */

    return(
        <div className="h-full">
            <div className="h-full">
                <Slider/>
                <NewRelease/>
                <SeasonTheme/>
            </div>
        </div>
    )
}

export default Home