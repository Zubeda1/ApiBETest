import axios, {AxiosError} from 'axios'

const body = {
    "username" : "admin",
    "password" : "password123"
}

export async function getAccessToken(){
    const client = axios.create({
        baseURL:'https://restful-booker.herokuapp.com/auth'
    })
    const authToken = await client.post('', body).catch((e:AxiosError) => e.response)
    return authToken?.data.token
}