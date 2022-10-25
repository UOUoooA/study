import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from "@/router";
import typeNavpage from "@/views/typeNavpage";
import store from "@/store";
import './mock/mockServe'
import 'swiper/css/swiper.css'
import pageNation from "@/components/pageNation";
import * as API from './api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//使用ElementUI
Vue.use(ElementUI);
Vue.component(typeNavpage.name,typeNavpage)
Vue.component(pageNation.name,pageNation)
Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  router,
  store,
  beforeCreate() {
  Vue.prototype.$bus=this
    Vue.prototype.$API=API
    },
  render: h => h(App),
}).$mount('#app')
