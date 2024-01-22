import axios from '../axios'

const getHome = () => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: '/home',
            method: 'get'
        })
        resolve(res);
    } catch (error) {
        reject(error)
    }
})

const getSongMp3 = (id) => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: `/song?id=${id}`,
            method: 'get',
            // data: {id}
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

const getInfoSong = (id) => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: `/infosong?id=${id}`,
            method: 'get',
            // data: {id}
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

export {
    getHome, getSongMp3, getInfoSong
}
