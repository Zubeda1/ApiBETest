import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockGetAllBookingsResponse = {
    status : 200,
    data : [
        {'bookingid':1},
        {'bookingid': 23}
    ]
}

const mockGetSpecificBookingResponse ={
    status :200,
    data : {
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2026-01-23"
        },
        "depositpaid": true,
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111
    }                                                                                                       
}

describe('get bookings - unit', () => {
    it('should get all bookings', async () => {
        mockedAxios.get.mockResolvedValue(mockGetAllBookingsResponse)

        const response = await axios.get('/booking')

        expect(response.status).toBe(200)
        expect(response.data).toEqual(mockGetAllBookingsResponse.data)
        expect(mockedAxios.get).toHaveBeenCalledWith('/booking')
    })

    test('it should get a specific id response',async() => {
        mockedAxios.get.mockResolvedValue(mockGetSpecificBookingResponse)

        const response = await axios.get('/booking/1')
        expect(response.status).toBe(200)
        expect(response.data).toEqual(mockGetSpecificBookingResponse.data)
        expect(mockedAxios.get).toHaveBeenCalledWith('/booking/1')
    })
})  