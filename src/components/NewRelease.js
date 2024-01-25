import { useEffect, useState } from "react"
import * as apis from '../apis'

const NewRelease = () => {
    const [songs, setSong] = useState([])

    useEffect(() => {
        const getListRelease = async() => {
            let res = await apis.getNewReleaseChart()
            console.log('check data release chart:', res);
        }
        getListRelease()
    }, [])

    return(
        <div>ABC</div>
    )
}

export default NewRelease