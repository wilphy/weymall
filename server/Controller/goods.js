const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

//商品详情
router.get('/insertAllGoodsInfo',async(ctx) => {
  fs.readFile('./newGoods.json','utf8',(err,data) => {
    data=JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index)=>{
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log(MediaStreamErrorEvent)
      })
    })
  })
  ctx.body = "开始导入数据"
})

//商品分类
router.get('/insertAllCategory',async(ctx)=>{
  fs.readFile('./category.json','utf8',(err,data)=>{
      data=JSON.parse(data)
      let saveCount=0
      const Category = mongoose.model('Category')
      data.RECORDS.map((value,index)=>{
          console.log(value)
          let newCategory = new Category(value)
          newCategory.save().then(()=>{
              saveCount++
              console.log('成功'+saveCount)
          }).catch(error=>{
               console.log('失败：'+error)
          })
      })
  })
  ctx.body="开始导入数据"
})

//商品子类
router.get('/insertAllCategorySub',async(ctx)=>{
  fs.readFile('./category_sub.json','utf8',(err,data)=>{
      data = JSON.parse(data)
      let saveCount = 0 
      const CategorySub = mongoose.model('CategorySub')
      data.RECORDS.map((value,index)=>{
          console.log(value)
          let newCategorySub = new CategorySub(value)
          newCategorySub.save().then(()=>{
              saveCount++
              console.log('成功插入'+saveCount)
              
          }).catch(error=>{
              console.log('插入失败:'+error)
          })
      }) 
  })
  ctx.body="开始导入数据"
})

//***获取商品详细信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
  try {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    let result =  await Goods.findOne({ID:goodsId}).exec();
    ctx.body = {code: 200, message: result};
  } catch(error) {
    ctx.body = {code: 500, message: error};
  }
})

module.exports = router