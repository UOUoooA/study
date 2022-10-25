import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
import {getUUid} from "@/utils/uuId_token";

const state={
    goodInfo:{},
    uuId_token:getUUid()
}
const mutations={
    GETGOODINFO(state,goodInfo){
     state.goodInfo=goodInfo
    }
}
const actions={
    async getGoodInfo({commit},skuId){
        let res= await reqGoodsInfo(skuId)
        if(res.code==200){
            commit('GETGOODINFO',res.data)
        }
    },
    async getAddShopcar({commit},{skuId,skuNum}){
        let res=await reqAddOrUpdateShopCart(skuId,skuNum)
        if(res.code==200) return 'OK'
        else return Promise.reject(new Error('Error'))
    }

}
const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}


export default {
    state,mutations,actions,getters
}