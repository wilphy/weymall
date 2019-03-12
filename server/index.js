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
let home = require('./Controller/home.js')

//装载所有子路由
let router = new Router();
router.use('/user', user.routes())
router.use('/home', home.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行 
// ;(async () =>{
//   await connect()
//   initSchemas()
//   const User = mongoose.model('User')
//   let oneUser = new User({userName: 'wey003', password:'123456'})
//   oneUser.save().then(()=>{
//       console.log('插入成功')
//   })
//   let users = await User.findOne({}).exec()
//   console.log('------------------')
//   console.log(users)
//   console.log('------------------')
// })()

app.use(async(ctx) => {
  ctx.body = '<h1>hello world</h1>'
})

app.listen(3000, () => {
  console.log('[server] staring at port 3000')
})