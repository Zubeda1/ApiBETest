import axios,{AxiosError} from'axios'
import { getAccessToken } from '../utils/auth'

const client = axios.create({
    baseURL:'https://restful-booker.herokuapp.com'
})
let headers: {
    'Cookie':string,
    'Accept': string,
    'Content-Type': string
}

const body = {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    }

describe('Delete a Booking',() => {
   
    test('it should delete created booking',async () => {
         headers = {
            'Cookie': `token=${await getAccessToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const postBookerResponse = await client.post('/booking', body, { headers} )
        .catch((e:AxiosError)=> e.response)
        expect(postBookerResponse?.status).toBe(200)
        expect(postBookerResponse?.data).toBeDefined()
        const id = postBookerResponse?.data.bookingid


        const deleteBookerResponse = await client.delete(`/booking/${id}`, { headers })
        .catch((e:AxiosError) => e.response)
        expect(deleteBookerResponse?.status).toEqual(201)
        expect(deleteBookerResponse?.data).toEqual('Created')

        const getDeletedBookerResponse = await client.get(`/booking/${id}`, {headers})
        .catch((e:AxiosError) => e.response)
        expect(getDeletedBookerResponse?.status).toEqual(404)
        expect(getDeletedBookerResponse?.data).toEqual('Not Found') 
    })

    test('it should throw error if no token provided', async() =>{
        const postBookerResponse = await client.post('/booking', body, { headers} )
        .catch((e:AxiosError)=> e.response)
        expect(postBookerResponse?.status).toBe(200)
        expect(postBookerResponse?.data).toBeDefined()
        const id = postBookerResponse?.data.bookingid

        const deleteBookerResponse = await client.delete(`/booking/${id}`, { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } })
        .catch((e:AxiosError) => e.response)
        expect(deleteBookerResponse?.status).toEqual(403)
        expect(deleteBookerResponse?.data).toEqual('Forbidden')     
    })
})