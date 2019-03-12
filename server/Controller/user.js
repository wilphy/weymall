const Router = require ('koa-router')

let router = new Router()

router.get('/', async(ctx)=>{
  ctx.body = "用户首页"
})

router.post('/register', async(ctx)=>{
  console.log(ctx.request.body)
  ctx.body = ctx.request.body
})

module.exports = router;