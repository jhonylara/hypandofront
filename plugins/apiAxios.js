
export default function ({ $axios, store }, inject) {
  // Create a custom axios instance
  if(process.client){
    const api = $axios.create({
      baseURL: 'http://localhost/api',
      timeout: 10000,
      headers: {'Authorization': store.getters.token}
    })
    inject('api', api)
  }
}
