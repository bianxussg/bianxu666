<template>
  <div id="app">
    <home-page></home-page>
    <router-view></router-view>
  </div>
</template>

<script>
  import homePage from './components/homePage/homePage.vue'
export default {
  name: 'App',
  components:{
    homePage,
  }
}
</script>

<style>

</style>
