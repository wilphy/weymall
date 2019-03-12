const Router = require ('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async(ctx)=>{
  ctx.body = "用户首页"
})

router.post('/register', async(ctx)=>{
  console.log(ctx.request.body)
  ctx.body = ctx.request.body

  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

module.exports = router;