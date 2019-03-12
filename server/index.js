const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
//引入connect
const {connect, initSchemas} = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')

app.use(bodyParser())
app.use(cors())


let user = require('./Controller/user.js')
let goods = require('./Controller/goods.js')

//装载所有子路由
let router = new Router();
router.use('/user', user.routes())
router.use('/goods',goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行 
;(async () =>{
  await connect()
  initSchemas()
})()

app.use(async(ctx) => {
  ctx.body = '<h1>hello world</h1>'
})

app.listen(3000, () => {
  console.log('[server] staring at port 3000')
})