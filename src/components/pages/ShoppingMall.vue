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
          <img :src="item.imgUrl" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Shopping Mall',
        locationIcon: require('../../assets/imgages/location.png'),
        swipeImgArray: [
          {imgUrl: 'https://img.alicdn.com/simba/img/TB1wgk8KpXXXXX_XFXXwu0bFXXX.png'},
          {imgUrl: 'https://img.alicdn.com/tfs/TB1N_Y6KMHqK1RjSZFkXXX.WFXa-520-280.jpg_q90_.webp'},
          {imgUrl: 'https://img.alicdn.com/tfs/TB1E4.AKIbpK1RjSZFyXXX_qFXa-520-280.png_q90_.webp'}
        ]
      }
    },
  }
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background: #ff006d;
    overflow: hidden;
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
</style>