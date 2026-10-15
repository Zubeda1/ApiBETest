import axios, {AxiosError} from 'axios'

const client = axios.create({
    baseURL:'https://restful-booker.herokuapp.com'
})
let headers: {
    'Accept': string,
    'Content-Type': string
}

describe('Get Bookings',() => {
    beforeAll(async()=> {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }       
    })
    test('it should get all the bookings',async () =>{
      const response = await client.get('/booking')
       .catch((e:AxiosError) => e.response)

      expect(response?.status).toEqual(200)
      expect(response?.data).toBeDefined()
      expect(response?.data).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
            "bookingid": expect.any(Number)
        })
      ]))
    })

    test('it should get a booking by id',async() =>{
        const response = await client.get('/booking/3', { headers })
        .catch((e:AxiosError) => e.response)

        expect(response?.status).toEqual(200)
         expect(response?.data).toEqual(
           expect.objectContaining({
            "bookingdates": expect.objectContaining({
              "checkin": expect.any(String),
              "checkout": expect.any(String),
            }),
           "depositpaid": expect.any(Boolean),
           "firstname": expect.any(String),
           "lastname": expect.any(String),
           "totalprice": expect.any(Number),
    
        })
        )
        
    })


})