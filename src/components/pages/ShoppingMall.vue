<template>
  <div>
    <!-- 顶部 -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon"/>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swipe-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(item ,index) in swipeImgArray" :key="index">
          <img :src="item.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 类别 -->
    <div class="type-bar">
      <div class="cate" v-for="(cate, index) in category" :key="index">
        <img :src="cate.image" width="80%" class="cate-icon">
        <span>{{ cate.mallCategoryName }}</span>
      </div>
    </div>
    <!-- 广告栏 -->
    <div style="margin-top: .35rem">
      <img :src="adBanner" width="100%" />
    </div>
    <!-- 商品推荐 -->
    <div class="recommand-area">
      <div class="recommand-title">商品推荐</div>
      <div class="recommand-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommand-item">
              <img :src="item.image" width="80%">
              <div>{{ item.goodsName }}</div>
              <div class="recommand-item-price">￥{{ item.mallPrice | moneyFilter}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 -->
    <floor :floorData="floor1" :floorTitle="floorName.floor1"></floor>
    <floor :floorData="floor2" :floorTitle="floorName.floor2"></floor>
    <floor :floorData="floor3" :floorTitle="floorName.floor3"></floor>

    <!-- 热卖区域 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <GoodsInfo
                :goodsId="item.goodsId"
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price">
              </GoodsInfo>
            </van-col>
        </van-row>
        </van-list>
      </div>
    </div>

    <van-tabbar>
        <van-tabbar-item icon="shop">
          <router-link to="">首页</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="records">
          <router-link to="categoryList">列表页</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="cart" info="20">
          <router-link to="cart">购物车页</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="contact">
          <router-link to="register">会员中心</router-link>
        </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import {toMoney} from '@/filter/moneyFilter'
  import Floor from '@/components/common/Floor.vue'
  import GoodsInfo from '@/components/common/GoodsInfo.vue'

  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView:3
        },
        locationIcon: require('../../assets/images/location.png'),
        swipeImgArray: [],   //轮播图
        category: [],        //类别
        adBanner: '',        //广告栏
        recommendGoods: [],  //推荐商品
        floorName: {},       //楼层名字
        floor1: [],
        floor2: [],
        floor3: [],      
        hotGoods: [],        //热卖商品
      }
    },
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    components: {swiper, swiperSlide, Floor, GoodsInfo},
    created() {
      axios({
        // url: 'https://www.easy-mock.com/mock/5c838bf20994c30d33e411ca/weymall/index',
        url: url.getShoppingMallInfo,
        method: 'get'
      })
      .then(response => {
        console.log(response);
        if(response.status == 200) {
          //轮播图
          this.swipeImgArray = response.data.data.slides;
          //类别
          this.category = response.data.data.category;
          //广告栏
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          //推荐
          this.recommendGoods = response.data.data.recommend;
          // 楼层
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background: #ff006d;
    overflow: hidden;
      text-align: center;
  }
  .location-icon {
    padding-top: .1rem;
    padding-left: .2rem
  }
  .search-input {
    width: 100%;
    height: 1.3rem;
    border: 0;
    border-bottom: 1px solid #fff !important;
    background-color: #ff0066;
    color: #fff
  }
  .swipe-area {
    clear: both;
    max-height: 12rem;
    overflow: hidden;
  }
  .type-bar {
    background-color: #fff;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar div {
    flex: 1;
    text-align: center;
    padding: .3rem;
  }
  .recommand-area {
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommand-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #ff0066;
  }
  .recommand-body {
    padding: .2rem;
    font-size: 12px;
    color: #333;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
  .recommand-item-price {
    color: #c00;
  }
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
  .hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
</style>