import axios from 'axios'

export default class DefaultService {

  constructor (baseUrl) {
    axios.baseURL  = baseUrl
    this.client = axios
  }

  validateParams (required, params) {
    if (typeof params !== 'object') {
      throw new Error('Expected Object')
    }
    return required.every(param => param in params)
  }
}
