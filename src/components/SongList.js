import { memo } from "react";
import Song from "./Song";
import { useSelector } from "react-redux";

const SongList = () => {

    const {songs} = useSelector(state => state.music)
    
    return(
        <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-full gap-10 text-gray-500 font-medium uppercase p-3">
                <span className="w-[50%]">bài hát</span>
                <span className="flex-auto">Album</span>
                <span className="flex-auto text-right">thời gian</span>
            </div>
            <div className="flex flex-col min-h-full">
                {songs?.map((item) => (
                    <Song key={item.encodeId} song={item} isAlbum={1}/>
                ))}
            </div>
        </div>
    )
}

export default memo(SongList) 