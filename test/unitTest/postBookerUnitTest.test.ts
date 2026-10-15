import  axios from'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockBookingResponse = {
    status: 200,
    data: {
        bookingid: 1,
        booking: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-01-01',
                checkout: '2026-01-23'
            },
            additionalneeds: 'Breakfast'
        }
    }
}

describe('post a booking - unit', () => {
    it('should create a new booking', async () => {
        mockedAxios.post.mockResolvedValue(mockBookingResponse)

        const response = await axios.post('/booking', mockBookingResponse.data.booking)

        expect(response.status).toBe(200)
        expect(response.data).toEqual(mockBookingResponse.data)
        expect(response.data.bookingid).toBeDefined()
        expect(mockedAxios.post).toHaveBeenCalledWith('/booking', mockBookingResponse.data.booking)

    })
})