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
    <div>
      <img :src="adBanner" width="100%" />
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        msg: 'Shopping Mall',
        locationIcon: require('../../assets/imgages/location.png'),
        swipeImgArray: [],
        category: [],
        adBanner: '',
      }
    },
    created() {
      axios({
        url: 'https://www.easy-mock.com/mock/5c838bf20994c30d33e411ca/weymall/index',
        method: 'get',

      })
      .then(response => {
        console.log(response)
        if(response.status == 200) {
          this.swipeImgArray = response.data.data.slides;
          this.category = response.data.data.category;
          console.log(this.category);
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
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
</style>