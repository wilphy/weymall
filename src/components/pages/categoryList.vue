<template>
  <div>
    <!-- 标题 -->
    <header class="navbar">
      <van-nav-bar title="类别列表" /> 
    </header>
    <van-row>
      <!-- 左侧 -->
      <van-col span="6">
        <div id="leftNav">
          <ul>
            <li
              v-for="(item, index) in category"
              :key="index"
              @click="clickCategory(index, item.ID)"
              :class="{categoryActive:categoryIndex==index}">
              {{ item.MALL_CATEGORY_NAME }}
            </li>
          </ul>
        </div>
      </van-col>
      <!-- 右侧 -->
      <van-col span="18">
        <div class="tabCategorySub">
          <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME">
              </van-tab>
          </van-tabs>
        </div>

        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad">
              <div
                class="list-item"
                v-for="(item,index) in goodList"
                :key="index"
                @click="goGoodsInfo(item.ID)">
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                </div>
                <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class="">￥{{ item.ORI_PRICE | moneyFilter }}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>

      </van-col>
    </van-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  import {toMoney} from '@/filter/moneyFilter.js'

  export default {
    data() {
      return {
        category: [],
        categorySub: [],
        categoryIndex: 0,
        active: 0,
        loading: false,   //上拉加载使用
        finished: false,  //上拉加载是否没有数据了
        isRefresh:false,   //下拉刷新
        page: 1,          //商品列表的页数
        goodList: [],     //商品信息
        categorySubId: '', //商品子分类ID
        errorImg: 'this.src="'+require('@/assets/images/errorimg.png') + '"'  //错误图片显示路径
      }
    },
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    created() {
      this.getCategoty();
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      document.getElementById('leftNav').style.height = winHeight -46 + 'px';
      document.getElementById('list-div').style.height = winHeight - 90 + 'px';
    },
    methods: {
      // 获取大类数据
      getCategoty() {
        axios({
          url:url.getCategoryList,
          method: 'get',
        })
        .then(response => {
          if(response.data.code == 200 && response.data.message) {
            console.log(response)
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast('服務器錯誤，數據獲取失敗')
          }
        })
        .catch(error => {
          console.log(error)
          Toast('服務器錯誤，數據獲取失敗')
        })
      },

      // 根据大类获取小类
      getCategorySubByCategoryId(categoryId) {
        axios({
          url: url.getCategorySubList,
          method: 'post',
          data:{categoryId: categoryId}
        })
        .then(response => {
        if(response.data.code == 200 && response.data.message) {
            console.log(response)
            this.categorySub = response.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
        } else {
            console.log('服务器错误，数据取得失败')
            Toast('服务器错误，数据取得失败')
          }  
        })
        .catch(error => {
          console.log(error)
          Toast('服务器错误，数据取得失败')
        }) 
      },

      // 点击选中
      clickCategory(index, categoryId){
        this.categoryIndex = index;
        this.page = 1;
        this.finished = false;
        this.goodList = [];
        this.getCategorySubByCategoryId(categoryId);
},
      //上拉加载
      onLoad(){
        setTimeout(()=>{
          this.categorySubId = this.categorySubId ? this.categorySubId:this.categorySub[0].ID
          this.getGoodList()
        }, 1000)
      },

      // 下拉刷新
      onRefresh(){
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodList = [];
          this.page = 1;
          this.onLoad()
        }, 500);
      },

      getGoodList(){
        axios({
          url: url.getGoodsListByCategorySubID,
          method:'post',
          data:{
            categorySubId: this.categorySubId,
            page: this.pages
          }
        })
      .then(response=>{
        console.log(response)
        if(response.data.code == 200 && response.data.message.length ){
          this.page++;
          this.goodList = this.goodList.concat(response.data.message);
        } else {
          this.finished = true;
        }
        this.loading = false;
        console.log(this.finished)
      })
      .catch(error => {
          console.log(error)
      })
    },

      //点击子类获取商品信息
      onClickCategorySub(index,title){
        //console.log( this.categorySub)
        this.categorySubId = this.categorySub[index].ID;
        console.log(this.categorySubId);
        this.goodList = [];
        this.finished = false;
        this.page = 1;
        this.onLoad();
      },

      //跳转到商品详情页
      goGoodsInfo(id){
        this.$router.push({ name:'Goods', params:{ goodsId: id }})
      }
    }

  }
</script>

<style scoped>
.van-nav-bar {
  background-color: #e6f5de;
}
#leftNav {
  background-color: #f7f3fc;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #E4E7ED;
  padding: 3px;
  font-size: .8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item{
  display: flex;
  flex-direction: row;
  font-size:0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding:5px;
}
#list-div{
  overflow: scroll;
}
.list-item-img{
  flex:8;
}
.list-item-text{
  flex:16;
  margin-top:10px;
  margin-left:10px;
}
</style>