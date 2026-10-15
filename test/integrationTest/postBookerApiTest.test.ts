import axios,{AxiosError} from'axios'

const client = axios.create({
    baseURL:'https://restful-booker.herokuapp.com'
})
let headers: {
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

describe('Post Bookings',() => {

    beforeAll(async()=> {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }       
    })

    test('it should create a booking',async () => {
      
      const postBookerResponse = await client.post('/booking',body, { headers })
       .catch((e:AxiosError) => e.response)  
      expect(postBookerResponse?.status).toEqual(200)
      expect(postBookerResponse?.data).toBeDefined()
      expect(postBookerResponse?.data).toEqual(
        expect.objectContaining({
            "bookingid": expect.any(Number),
            "booking": expect.objectContaining({
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            })
        })
      )
      const id = postBookerResponse?.data.bookingid

      const getBookerResponse = await client.get(`/booking/${id}`, { headers })
       .catch((e:AxiosError) => e.response)
      expect(getBookerResponse?.status).toEqual(200)
      expect(getBookerResponse?.data).toEqual(body)
    })
})