import { NewRelease } from "../../components"
import Slider from "../../components/Slider"

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
            </div>
        </div>
    )
}

export default Home