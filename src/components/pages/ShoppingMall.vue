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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Shopping Mall',
        locationIcon: require('../../assets/imgages/location.png')
      }
    },
  }
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background: #ff006d;
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
</style>