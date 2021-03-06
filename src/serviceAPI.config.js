const BASEURL = "https://www.easy-mock.com/mock/5c838bf20994c30d33e411ca/weymall/"
const LOCALURL = "http://localhost:3000/"

const URL = {
    getShoppingMallInfo: BASEURL + 'index',    //商城首页信息
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register',   //用户注册接口
    loginUser: LOCALURL + 'user/login',         //用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',   //获取商品详情
    getCategoryList: LOCALURL + 'goods/getCategoryList',         //得到大类信息
    getCategorySubList: LOCALURL + 'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID',   //得到小类商品信息
}


module.exports = URL