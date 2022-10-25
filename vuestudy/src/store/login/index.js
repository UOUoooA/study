import {reqLoginUser,reqUserInfo,reqLogOut} from "@/api";
import {setToken,getToken,removeToken} from "@/utils/token";

const state={
    token:getToken(),
    userInfo:{}
}
const mutations={
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEARUSERINFO(state){
        state.token=''
        state.userInfo=''
        removeToken()
    }
}
const actions={
   async postLogin({commit},data){
       let res = await reqLoginUser(data)
        if(res.code==200){
            commit('USERLOGIN',res.data.token)
            setToken(res.data.token)
            return 'ok'
        }else return Promise.reject(new Error('wrong'))
    },
    async getUserInfo({commit}){
      let res = await reqUserInfo()
        if(res.code==200){
        commit('GETUSERINFO',res.data)
            return 'ok'
   }else {
            return Promise.reject(new Error('wrong'))
        }
   },
    async logOut({commit}){
      let res = await reqLogOut()
   if(res.code==200){
       commit('CLEARUSERINFO')
       return 'ok'
   }else {
       return Promise.reject(new Error('wrong'))
   }
   }
}
const getters={}
export default {
    state,mutations,actions,getters
}