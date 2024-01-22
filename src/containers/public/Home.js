import { Header } from "../../components"
import homeAPI  from "../../apis/homeAPI"
import { useEffect } from "react"
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
            <div className="h-[70px] px-12">
                <Header/>
                <Slider/>
            </div>
        </div>
    )
}

export default Home