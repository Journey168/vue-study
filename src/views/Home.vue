<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>This is an Home page</h1> -->
    <VuexTest></VuexTest>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import VuexTest from '@/components/vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
    VuexTest
  }
}
</script>
