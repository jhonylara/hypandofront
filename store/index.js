export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  strategy(state) {
    return state.auth.strategy
  },

  token(state) {
    return state.auth['access_token.'+ state.auth.strategy]
  }
}
