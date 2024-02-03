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

const getPlaylist = (id) => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: `/detailplaylist?id=${id}`,
            method: 'get'
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

const getNewReleaseChart = () => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: `/newreleasechart`,
            method: 'get'
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

const getTop100 = () => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: `/top100`,
            method: 'get'
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

const search = (keyword) => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: `/search`,
            method: 'get',
            params: {keyword}
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

export {
    getHome, getSongMp3, getInfoSong, getPlaylist, getNewReleaseChart, getTop100, search
}
