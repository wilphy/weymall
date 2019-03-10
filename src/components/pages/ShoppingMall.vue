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
              <div>￥{{ item.mallPrice }}(￥{{ item.price }})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 -->
    <div class="floor">
      <div class="floor-irregular">
        <div class="floor-one">
          <img :src="floor1_0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floor1_1.image" width="100%" />
          </div>
          <div>
            <img :src="floor1_2.image" width="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="floor-regular">
      <div v-for="(item, index) in floor1.slice(1)" :key="index">
        <img :src="item.image" width="100%" />
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView:3
        },
        locationIcon: require('../../assets/imgages/location.png'),
        swipeImgArray: [],
        category: [],
        adBanner: '',
        recommendGoods: [],
        floor1: [],
        floor1_0: {},
        floor1_1: {},
        floor1_2: {}
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    created() {
      axios({
        url: 'https://www.easy-mock.com/mock/5c838bf20994c30d33e411ca/weymall/index',
        method: 'get',

      })
      .then(response => {
        console.log(response)
        if(response.status == 200) {
          //轮播图
          this.swipeImgArray = response.data.data.slides;
          //类别
          this.category = response.data.data.category;
          //广告栏
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          //推荐
          this.recommendGoods = response.data.data.recommend;
          // 1楼
          this.floor1 = response.data.data.floor1
          this.floor1_0 = this.floor1[0];
          this.floor1_1 = this.floor1[1];
          this.floor1_2 = this.floor1[2];
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
    padding: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar div {
    width: 20%;
    text-align: center;
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
  }
  .recommand-item {
    width: 99%;
    border-right: 1px solid #eee;
    text-align: center;
  }
  .floor-irregular {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-irregular div {
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
  .floor-regular {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .floor-regular div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }
  .floor-regular div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
</style>