<template>
  <div>
    <v-alert
      icon="mdi-shield-lock-outline"
      prominent
      color="red"
      text
      type="info"
    >
      <span style="font-family: 'Roboto', sans-serif; margin-left: 20px">VOCÊ ESTÁ SEGURO! AGUARDE... REDIRECIONANDO!</span>

    </v-alert>
    <v-img max-width="500px" src="https://image.myanimelist.net/ui/2dz6EZS_LXve8zZh6qIGWZnnh3XfjCiHAdCoa2tpn6NFTjgseBMqh0dRqI2UOqvDLg3eYnqyxJcSwClJgIG4aQ"></v-img>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'login-layout',
  name: "callback",
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    console.log(this.$auth.fetchUser());

    if (code && state) {
      console.log('second-' + state)

      if (state === window.sessionStorage.getItem('state')) {

        console.log('storage-' + window.sessionStorage.getItem('state'))

        let params = {
          grant_type: 'authorization_code',
          client_id: this.$config.passport.CLIENT_ID,
          redirect_uri:  this.$config.passport.CALLBACK_URL,
          code_verifier: window.sessionStorage.getItem('verifier'),
          code
        }

        this.$axios.$post('oauth/token', this.form)
          .then(({token, expiresIn}) => {
            this.$store.dispatch('setToken', {token, expiresIn});
            this.$router.push({name: 'secret'});
          })
          .catch(errors => {
            console.dir(errors);
          });

        //
        // await axios.post(this.$config.passport.TOKEN_URL, params).then(resp => {
        //     sessionStorage.removeItem('state');
        //     sessionStorage.removeItem('verifier');
        //     //access_token / expires_in / refresh_token / token_type
        //     // this.$auth.setUserToken(resp.data.access_token, resp.data.refresh_token)
        //   this.$auth.login(resp.data)
        //   console.log(resp)
        //     window.opener.postMessage(resp.data, 'http://localhost:3000/login');
        //     // window.close();
        //   })
        //   .catch(e => {
        //     console.dir(e);
        //   });
      }
    }
  }
}
</script>

<style scoped>

</style>
