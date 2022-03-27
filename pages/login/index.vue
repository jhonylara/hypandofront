<template>
  <v-row style="" no-gutters>
    <v-col className="col-xl-7 col-lg-6 col-md-4 col-sm-1 col-xs-0">
    </v-col>
    <v-col className="col-xl-5 col-lg-6 col-md-8 col-sm-11 col-xs-12">

      <div class="seila">
          <div style="padding: 10%" v-if="showLogin">
            <v-card
              class="" color="grey lighten-2" flat tile style="">
              <h1>Login</h1>
            </v-card>
            <v-row>
              <v-col class="col-7">
                <div class="buttons">
                  <v-btn
                    v-show="showLogin"
                    depressed
                    :elevation="9"
                    outlined
                    raised
                    x-large
                    @click="openLoginWindow"
                  >LOGIN
                  </v-btn>
<!--                  <v-btn-->
<!--                    depressed-->
<!--                    elevation="9"-->
<!--                    outlined-->
<!--                    raised-->
<!--                    x-large-->
<!--                    @click="registerUserSend"-->
<!--                  >REGISTER-->
<!--                  </v-btn>-->
                </div>
              </v-col>
              <v-col class="col-5">
              <div class="buttons">
                <v-btn
                  v-show="showLogin"
                  @click="loginWithGoogle"
                  elevation="9"
                  raised
                  x-large
                  style="color: white; padding-left: 2px !important; margin-left: 2px !important;"
                  color="#4285f4"
                >
                  <div
                    style="margin-right: 20px; background-color: white; height: 48px; width: 50px; border-radius: 4px;">
                    <img style="    position: absolute; top: 9px; left:  10px;" width="30px" height="30px"
                         src="@/static/google-color.svg"/>
                  </div>
                  Login com Google
                </v-btn>
              </div>
              </v-col>

            </v-row>


            </div>
          </div>
        <v-slide-x-transition>
          <div style="padding: 10%" v-if="showRegister">
            <v-card
              class="" color="grey lighten-2" flat tile style="">
              <h1>Register</h1>
            </v-card>
            <v-row class="input">
              <v-col class="col-6">
                <v-text-field
                  label="Username"
                  color="purple darken-2"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field label="Senha"></v-text-field>
              </v-col>
            </v-row>
            <div class="buttons">
              <v-btn
                depressed
                elevation="9"
                outlined
                raised
                x-large
                @click="swapToLogin"
              >LOGIN
              </v-btn>
              <v-btn
                depressed
                elevation="9"
                outlined
                raised
                x-large
                @click="registerUserSend"
              >CRIAR USUARIO
              </v-btn>

            </div>
          </div>
        </v-slide-x-transition>
        <div style="padding: 10%">

        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import qs from 'qs'
import crypto from 'crypto-js'
import { mapGetters } from 'vuex'
import cookie from "qs";
export default {
  layout: "login-layout",
  name: "login",
  // ...mapGetters(['isAuthenticated', 'loggedInUser', 'token']),
  components: {},
  watch: {
    isAuthenticated(e){
      console.log(e)
    }
  },
  data() {
    return {
      showLogin: true,
      showRegister: false
    }
  },
  methods: {
    // swapToRegister() {
    //   this.showLogin = !this.showLogin
    //   setTimeout(() => this.showRegister = !this.showRegister, 400)
    // },
    // swapToLogin() {
    //   this.showRegister = !this.showRegister
    //   setTimeout(() => this.showLogin = !this.showLogin, 400)
    // },
    loginWithGoogle() {
      // this.$auth.loginWith('google')
      this.$auth.loginWith('google')
    },
    // registerUserSend() {
    //   console.log(this.$auth.state)
    //   // this.$auth.loginWith('laravelPassport', {user: 'teste', email: 'twiewoitji@toiwejtowi.com'})
    // },
    // base64Url(string) {
    //   return string.toString(crypto.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    // },
    openLoginWindow() {
      console.log(this.isAuthenticated)
      this.$auth.loginWith('social', {frontParam: 'test_front'})
      // window.addEventListener('message', (e) => {
      //   console.log(e)
      //   if (e.origin !== 'http://localhost:3000' || ! Object.keys(e.data).includes('access_token')) {
      //     return;
      //   }
      //
      //   const {token_type, expires_in, access_token, refresh_token} = e.data;
      //   this.$axios.setToken(access_token, token_type);
      //
      //   this.$axios.$get('http://passport-pkce.web/api/user')
      //     .then(resp => {
      //       console.log(resp);
      //     })
      // });

      // let state = [...Array(40)].map(() => Math.random().toString(36)[2]).join('')
      // let verifier = [...Array(128)].map(() => Math.random().toString(36)[2]).join('')
      //
      // let challenge =  this.base64Url(crypto.SHA256(verifier))
      //
      // console.log(state)
      // console.log(verifier)
      // console.log(challenge)
      //
      //
      // window.sessionStorage.setItem('state', state);
      // window.sessionStorage.setItem('verifier', verifier);
      //
      // cookie.parse('foo=bar; equation=E%3Dmc%5E2')
      //
      // let params = {
      //   redirect_uri: this.$config.passport.CALLBACK_URL,
      //   response_type: 'code',
      //   scope: '',
      //   client_id: this.$config.passport.CLIENT_ID,
      //   state: state,
      //   code_challenge: challenge,
      //   code_challenge_method: 'S256',
      // }
      //
      // console.log(params)
      //
      //
      // let fullUrl = this.$config.passport.AUTHORIZE_URL + '/?' + qs.stringify(params)
      //
      // window.location.href = fullUrl //to debug on console
      // window.open(fullUrl, 'popup', 'width=500,height=500,resizable=false,menubar=false');

      // let baseUrl = 'http://localhost/oauth/authorize/?'
      // let fullUrl = baseUrl
      //   + '?client_id=' + 2
      //   + '&redirect_uri=' + params.redirect_uri
      //   + '&response_type=' + params.response_type
      //   + '&scope=' + params.scope
      //   // + '&state=' + params.state
      //   + '&code_challenge=' + params.code_challenge
      //   + '&code_challenge_method=' + params.code_challenge_method
      //
      // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      //
      // window.open(fullUrl, 'popup', 'width=700,height=700');


    },

  }
}
</script>

<style scoped>
h1 {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 4em;
  margin: 0.2em 0 0.1em;
}

.seila {
  background: white;
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  margin-right: 2vh;
  height: 96vh;
}

.buttons {
  font-family: 'Roboto', sans-serif;
  font-weight: bold !important;
}

.input {
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
}

#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}
</style>
