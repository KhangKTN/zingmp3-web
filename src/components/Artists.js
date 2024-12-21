import { Link } from 'react-router-dom'

const Artists = ({ artists }) => {
    const convertFollower = follower => {
        let result = ''
        if (follower >= 1000000) result = Math.round(follower / 100000) / 10 + 'M'
        else if (follower >= 1000) result = Math.round(follower / 100) / 10 + 'K'
        else result = follower
        return result
    }

    return (
        <div>
            <div className='flex items-center justify-between mt-12 mb-4'>
                <h1 className='text-xl font-bold'>Nghệ Sĩ/OA</h1>
            </div>
            <div className='grid grid-cols-4 gap-5'>
                {artists?.map(
                    (item, index) =>
                        index < 4 && (
                            <div key={item.link} className='flex flex-col items-center'>
                                <div className='rounded-full mb-3 overflow-hidden cursor-pointer'>
                                    <Link to={item.link}>
                                        <img
                                            className='w-full hover:scale-110 transition-all duration-500'
                                            src={item.thumbnail}
                                        ></img>
                                    </Link>
                                </div>
                                <Link to={item.link} className='hover:underline hover:text-active'>
                                    {item.name}
                                </Link>
                                <span className='text-sm text-gray-500'>
                                    {convertFollower(item.totalFollow)} quan tâm
                                </span>
                            </div>
                        )
                )}
            </div>
        </div>
    )
}

export default Artists
