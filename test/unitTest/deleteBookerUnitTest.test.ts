import axios from 'axios'
import { getAccessToken } from '../utils/auth'

jest.mock('axios')
jest.mock('../utils/auth') // mock the auth module

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedGetAccessToken = getAccessToken as jest.MockedFunction<typeof getAccessToken>

const mockedDeleteResponse = {
    status:200,
    data:{
    }
}

describe('delete a specific id - unit',() => {
   it('should delete a specific id',async () => {
     mockedAxios.delete.mockResolvedValue(mockedDeleteResponse)
     mockedGetAccessToken.mockResolvedValue('fakeToken123')
     
     const token = await getAccessToken()
     const response = await axios.delete('/booking/4',{
            headers: { Cookie: `token=${token}`}
        })
     expect(response.status).toBe(200)
     expect(mockedAxios.delete).toHaveBeenCalledWith('/booking/4', { headers:{
        Cookie:'token=fakeToken123'}
     })
   })
})