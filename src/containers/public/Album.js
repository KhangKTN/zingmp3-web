import { useParams } from "react-router-dom"

const Album = () => {
    const {title, id} = useParams()
    console.log(title, id);
    return(
        <div>Album</div>
    )
}

export default Album