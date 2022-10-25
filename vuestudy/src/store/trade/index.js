import {reqGetaddres,reqOrderInfo} from "@/api";

const state={
    userInfoList:[],
    orderInfo:{}
}
const mutations={
    USERINFOLIST(state,userInfoList){
        state.userInfoList=userInfoList
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const actions={
   async getUserAddress({commit}){
        let res = await reqGetaddres()
        if(res.code==200){
            commit('USERINFOLIST',res.data)
        }
    },
    async getOrderInfo({commit}){
       let res=await reqOrderInfo()
        if(res.code==200){
            commit('GETORDERINFO',res.data)
        }
    }
}
const getters={}
export default {
    state,mutations,actions,getters
}