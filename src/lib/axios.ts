import axios from 'axios'

const API = axios.create({
    baseURL: 'process.env.NEXT_PUBLIC_API_URL',
    headers: {
        'content-type' : 'application/json',
    }
})

export default API;