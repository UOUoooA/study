<template>
  <div id="app">
<head-page></head-page>
    <router-view></router-view>
<foot-page v-show="$route.meta.show!==false"></foot-page>
  </div>
</template>

<script>
import headPage from "@/components/headPage";
import footPage from "@/components/footPage";
export default {
  name: 'App',
  components: {
headPage,footPage
  },
  mounted() {
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
#app {

}
</style>
