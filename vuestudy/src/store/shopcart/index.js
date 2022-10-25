import {reqCartList,reqDeletShopCart,reqChangeCart} from "@/api";

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    async getShopCartList({commit}){
      let res =  await reqCartList()
if(res.code==200){
    commit('GETCARTLIST',res.data)
}
    },
    async getDeletCart({commit},skuId){
      let res=  await reqDeletShopCart(skuId)
        if(res.code==200){
            return 'ok'
        }else {
            return Promise.reject(new Error('wrong'))
        }
    },
    async getChangeCart({commit},{skuId,isChecked}){
       let res = await reqChangeCart(skuId,isChecked)
        if(res.code==200){
            return 'ok'
        }else {
            return Promise.reject(new Error('wrong!!!'))
        }
    },
    deleteAll({dispatch,getters}){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
           let res = item.isChecked==1?dispatch('getDeletCart',item.skuId):''
            PromiseAll.push(res)
        })
        return Promise.all(PromiseAll)
    },
    updateAll({dispatch,state},checked){
        let PromiseAll=[]
      state.cartList[0].cartInfoList.forEach(item=>{
          console.log(item)
          let res= dispatch('getChangeCart',{
              skuId:item.skuId,
              isChecked:checked
          })
          PromiseAll.push(res)
      })
        return Promise.all(PromiseAll)
    }
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
}

export default {
    state,mutations,actions,getters
}