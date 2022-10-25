import requests from "@/api/request";
import mockRequests from "@/api/mockAjax";
export const reqCategoryList=()=>{
    return  requests({
        url:'/api/product/getBaseCategoryList',
    })
}
export const reqBannerList=()=>mockRequests.get('/banner')

export const reqFloorList=()=>mockRequests.get('/floors')

export const reqSearchList=(params)=>requests({
    url:'/api/list',
    data:params,
    method:'post'
})
export const reqGoodsInfo=(skuId)=>requests({url:`/api/item/${skuId}`,method:'get'})
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/api/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
export const reqCartList=()=>requests({url:'/api/cart/cartList',method:'get'})
export const reqDeletShopCart = (skuId) => requests({url:`/api/cart/deleteCart/${skuId}`,method:'delete'})
export const reqChangeCart=(skuId,isChecked)=>requests({url:`/api/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
export const reqMesssegeCode=(phone)=>requests({url:`/api/user/passport/sendCode/${phone}`,methods:'get'})
export const reqRegisterUser=(data)=>requests({url:`/api/user/passport/register`,data,method:'post'})
export const reqLoginUser=(data)=>requests({url:'/api/user/passport/login',data,method:'post'})
export const reqUserInfo=()=>requests({url:'api/user/passport/auth/getUserInfo',method:'get'})
export const reqLogOut=()=>requests({url:'/api/user/passport/logout',method:'get'})
export const reqGetaddres=()=>requests({url:'/api/user/userAddress/auth/findUserAddressList',method:'get'})
export const reqOrderInfo=()=>requests({url:'/api/order/auth/trade',method:'get'})
export const reqSendOrder=(tradeNo,data)=>requests({url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
export const reqPaymessage=(orderId)=>requests({url:`/api/payment/weixin/createNative/${orderId}`,method:'get'})
export const reqCheckPayInfo=(orderId)=>requests({url:`/api/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
export const reqOrderList=(page,limit)=>requests({url:`/api/order/auth/${page}/${limit}`,method:'get'})