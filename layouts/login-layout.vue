<template class="reset-body">
  <Nuxt/>
</template>

<script>
export default {
  name: "loginlayout",
  head () {
    return {
      bodyAttrs: {
        class: 'reset-body'
      }
    }
  }
}
</script>

<style>
.reset-body {
  width: 100%;
  height:100%;

}

.reset-body {
  background: linear-gradient(-45deg, #dc4730, #ff7700, #fac025, #fc5a5a, firebrick, crimson);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
