<template>
<div><type-navpage></type-navpage>
<list-container-page></list-container-page>
  <recommond-page></recommond-page>
  <rank-page></rank-page>
  <like-page></like-page>
  <floor-page v-for="item in floorList" :key="item.id" :list="item"></floor-page>
  <band-page></band-page>
</div>
</template>

<script>
import listContainerPage from "@/views/listContainerPage";
import recommondPage from "@/views/recommondPage";
import rankPage from "@/views/rankPage";
import likePage from "@/views/likePage";
import floorPage from "@/views/floorPage";
import bandPage from "@/views/bandPage";
import {mapState} from "vuex";

export default {
  name: "homePage",
  components:{bandPage,floorPage,listContainerPage,recommondPage,rankPage,likePage},
  mounted() {
  this.$store.dispatch('getFloorList')
    },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style scoped>

</style>