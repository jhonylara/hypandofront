import DefaultService from './DefaultService'

const baseUrl = process.env.myVariable

export default class HypdoService extends DefaultService {

  constructor () {
    super(baseUrl)
  }

  getAllSteamGameList () {
    return Promise.resolve(this.client.get('/steam/allgames'))
  }

  getSteamGameInfo (gameId) {
    return Promise.resolve(this.client.get(`/steam/storegamedetails/${gameId}`))
  }

  getGenres () {
    return Promise.resolve(this.client.get(`/genres`))
  }

  saveNewGame (params) {
    return Promise.resolve(this.client.post('/game', params))
  }

  examplePut(params) {
    return Promise.resolve(this.client.put(`/example/${params.example}`, params))
  }

  examplePatch (params) {
    return Promise.resolve(this.client.patch(`${params.example}`, params))
  }
}
