import axios, {AxiosError} from 'axios'

const client = axios.create({
    baseURL:'https://restful-booker.herokuapp.com/'
})

describe('APIT TEST',() => {
    test('it should give response 200',async () =>{
      const response = await client.get('')
      expect(response.status).toEqual(200)
      console.log(response)
    })
})