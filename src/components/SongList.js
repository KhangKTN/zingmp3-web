import { memo } from "react";
import Song from "./Song";

const SongList = ({songlist, totalDuration}) => {
    return(
        <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-full gap-10 text-gray-500 font-medium uppercase p-3">
                <span className="w-[50%]">bài hát</span>
                <span className="flex-auto">Album</span>
                <span className="flex-auto text-right">thời gian</span>
            </div>
            <div className="flex flex-col min-h-full">
                {songlist?.map((item, index) => (
                    <Song key={item.encodeId} song={item}/>
                ))}
            </div>
            <div className="text-gray-500 text-sm mt-3">
                <span>{songlist?.length} bài hát / {totalDuration}</span>
            </div>
        </div>
    )
}

export default memo(SongList) 