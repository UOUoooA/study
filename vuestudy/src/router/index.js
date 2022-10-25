import Vue from 'vue'
import VueRouter from "vue-router";
import homePage from "@/views/homePage";
import search from "@/views/search";
import registerPage from "@/views/registerPage";
import loginPage from "@/views/loginPage";
import detail from "@/views/Detail";
import addCartSuccess from "@/views/AddCartSuccess";
import shopCart from "@/views/ShopCart";
import login from "@/views/Login";
import register from "@/views/Register";
import store from "@/store";
import trade from "@/views/Trade";
import pay from "@/views/Pay";
import paySuccess from "@/views/PaySuccess";
import Center from "@/views/Center";
import myOrder from "@/views/Center/myOrder";
import groupOrder from "@/views/Center/groupOrder";
Vue.use(VueRouter)
const routes=[
    {
        path: '',
        redirect:'home',

    },
    {
        path: '/center',
        component: Center,
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component: groupOrder
            },
            {
                path: '/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysucces',
        component: paySuccess
    },
    {
        path: '/trade',
        component: trade
    },
    {
        path: '/pay',
        component: pay

    },
    {
        path: '/addcartsuccess',
        component: addCartSuccess,
        name:'addcartsuccess',
        meta: {isShow: true}
    },
    {
        path:'/login',
        name:'login',
        component:login
    },
    {
        path: '/register',
        name:'register',
        component: register
    },
    {
        path: '/shopcart',
        component: shopCart,
        name:'shopCart',
        meta: {isShow: true}

    },
    {
        path: '/detail/:skuid?',
      component: detail,
        meta: {isShow:true}
    },
    {
        path:'/home',
        component:homePage,

    },
    {
        path:'/search/:keyword?',
        component:search,
        name:'search'
    },
    {
        path:'/register',
        component:registerPage,
        meta:{show:false}
    },
    {
        path:'/login',
        component:loginPage,
        meta:{show:false}

    }
]
let router =  new VueRouter({
    routes,
    scrollBehavior(){
        return{y:0}}

})
let name=store.state.login.userInfo.name
router.beforeEach(async (to,from,next)=>{
next();
    let token=store.state.login.token
    if(token){
        if(to.path=='/login'){
            next('/')
        }else {
            if(name){
                next()
            }else {
             try {
                 await store.dispatch('getUserInfo')
             }   catch (e) {
                 await store.dispatch('logOut')
                 next('/login')
             }
            }
        }
        }else {
            next()
         }
})
export default router