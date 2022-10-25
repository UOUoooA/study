import {reqCategoryList,reqBannerList,reqFloorList} from "@/api";
         const state={
                    categoryList:[],
                    bannerList:[],
                    floorList:[]
          };//存数据
         const mutations={
             CATEGORYLIST(state,categoryList){
                state.categoryList=categoryList
               },
             BANNERLIST(state,bannerList){
             state.bannerList=bannerList
             },
             FLOORLIST(state,floorList){
                 state.floorList=floorList
             }
    };//唯一修改state
          const actions={
            async categoryList({commit}){
            let res= await reqCategoryList()
            if(res.code===200){
                commit("CATEGORYLIST",res.data)
            }
            },
           async getBannerList({commit}){
                let res2=await reqBannerList()
               if(res2.code===200){
                   commit("BANNERLIST",res2.data)
               }
           },
              async getFloorList({commit}){
              let res3 =  await reqFloorList()
                  if(res3.code===200) {
                      commit("FLOORLIST", res3.data)
                  }
              }

        };//处理业务逻辑，异步

        const getters={};//类似于计算属性,用于简化仓库数据的获取
        export default {
            state,
            mutations,
            actions,
            getters
        }
