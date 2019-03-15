<template>
  <div>
    <header class="navbar-div">
      <van-nav-bar title="购物车" /> 
    </header>

    <!--清空购物车-->
    <div class="card-title">
        <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>

    <div class="cart-list">
      <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="cart-img"><img :src="item.image" width="100%" /></div>

        <div class="cart-text">
          <div class="cart-goods-name">{{item.Name}}</div>
            <div class="count-control">
              <van-stepper v-model="item.count" />
            </div>
        </div>

        <div class="cart-goods-price">
          ￥{{item.price | moneyFilter}}
          <div>x{{item.count}}</div>
          <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
        </div>
      </div>
      
      <!--显示总金额-->
        <div class="totalMoney">
          商品总价：￥ 
          <span>{{totalMoney | moneyFilter}}</span>
        </div>
    </div>
    
  </div>

  
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter.js'
  
  export default {
    data() {
      return {
        cartInfo: [],
        isEmpty: false
      }
    },
    filters: {
      moneyFilter(money){
        return toMoney(money)
      }
    },
    created() {
      this.getCartInfo();      
    },
    methods: {
      //得到购物车的商品
      getCartInfo() {
        //判断localStorage里是否有购物车数据
        if(localStorage.cartInfo){
          //如果有数据，我们去除并赋值给cartInfo
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
        //打印到控制台查看效果
        console.log(' this.cartInfo:' + JSON.stringify(this.cartInfo))
        this.isEmpty = this.cartInfo.length>0 ? true : false
      },
      // 清空购物车
      clearCart() {
        localStorage.removeItem('cartInfo');
        this.cartInfo = []
      }
    },
    computed: {
      totalMoney(){
          let allMoney = 0
          this.cartInfo.forEach((item,index) => {
              allMoney += item.price*item.count
          });
          localStorage.cartInfo=JSON.stringify(this.cartInfo)
          return allMoney
      }
    }
  }
</script>

<style scoped>
.card-title{
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px;
  text-align: right;
}
.cart-list{
  background-color: #fff;
}
.cart-row{
  display: flex;
  flex-direction: row;
  flex-wrap:nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom:1px solid #E4E7ED;
}
.cart-img{
  flex:6;
}
.cart-text{
  flex:14;
  padding-left: 10px;
}
.count-control {
  padding-top: 1rem; 
}
.cart-goods-price{
  flex:4;
  text-align: right;
  padding-top: .5rem;
}
.cart-goods-price div {
  margin: .1rem 0;
}
.allPrice {
  color: firebrick;
}
.totalMoney{
  text-align: right;
  background-color: #fff;
  border-bottom:1px solid #E4E7ED;
  padding: 5px;
}
.totalMoney span {
  color: firebrick;
}
</style>