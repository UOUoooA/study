import {reqMesssegeCode,reqRegisterUser} from "@/api";

const state={
    dataCode:''
}
const mutations={
    GETMESSSEGECODE(state,dataCode){
state.dataCode=dataCode
    }
}
const actions={
   async getMesssegeCode({commit},phone){
      let res= await reqMesssegeCode(phone)
       if(res.code==200){
           commit('GETMESSSEGECODE',res.data)
return 'ok'
       }else {
           return Promise.reject(new Error('wrong'))
       }
    },
   async getRegisterUser({commit},data){
      let res = await reqRegisterUser(data)
       console.log(res)
       if(res.code==200){
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