export default class ValidationService {

  name () {
    return [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ]
  }

  radioRequired() {
    return [
      v => !!v || 'Valor é obrigatorio',
    ]
  }

  isNumeric(value){
    if (!isNaN(parseInt(value))) return true
  }
}
