<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in carInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="changeCart(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('plus',+1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAll" @change="updateAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import debounce from 'lodash.debounce';
export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods:{
      getData(){
        this.$store.dispatch('getShopCartList')
      },
      async deleteCartById(cart){
        try {
        await this.$store.dispatch('getDeletCart',cart.skuId)
        this.getData()
        }
        catch (e) {
          console.log(e.message)
        }
      },
      handler:debounce(async function (item,difNum,cart){
        switch (item){
        case 'plus':difNum=1;
        break
        case 'mins':difNum=cart.skuNum>1?-1:0;
        break
        case 'change':
          console.log(difNum)
          if(isNaN(difNum)||difNum<1){
            difNum=0
          }
          else difNum=parseInt(difNum)-cart.skuNum
          break
          }
          try {
          await this.$store.dispatch('getAddShopcar',{skuId:cart.skuId,skuNum:difNum})
            this.getData()
          }catch (e) {
            console.log(e,'Error')
          }
                },500),
      async changeCart(cart,event){
       try{
         let isChecked=event.target.checked?'1':'0'
         await this.$store.dispatch('getChangeCart',{skuId:cart.skuId,isChecked})
        this.getData()
      }catch (e) {
         console.log(e.message)
       }
      },
      async deleteAll(){
       try {

       await this.$store.dispatch('deleteAll')
        this.getData()
      }catch (e) {
         console.log(e)
       }
      },
      async updateAll(event){
  try {
    let checked=event.target.checked?'1':'0'
   await this.$store.dispatch('updateAll',checked)
    this.getData()
  }catch (e) {
    console.log(e)
  }
      }
              },
  computed:{
      ...mapGetters(['cartList']),
    carInfoList(){
        return this.cartList.cartInfoList||[]
    },
    totalPrice(){
      let sum=0;
        this.carInfoList.forEach(item=>{

          sum+=item.cartPrice*item.skuNum;
                  })
      return sum
    },
    isAll(){
       return this.carInfoList.every(item=>item.isChecked==1)
    }
  }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>