require('dotenv').config();
// Library
const fs = require('fs');
const Koa = require("koa");
const https = require('https');
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const cors = require("@koa/cors");
const mongoose = require("mongoose");
const logger = require('koa-logging-middleware');
const ipFilter = require('koa-ip-filter');

const api = require("./api");
const { jwtMiddleware } = require('lib/token'); // jwt 미들웨어

const {
  PORT: port = 5000, // 값이 없으면 Default Value = 5000;
  NODE_ENV,
  MONGO_URI,
  DEV_MONGO_URI,
  DOMAIN
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정 
mongoose.connect(NODE_ENV === "DEVELOPMENT" ? DEV_MONGO_URI : MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
.then(
  console.log('connected to mongodb')
)
.catch(e => 
  console.error(e)
);
mongoose.set('useCreateIndex', true);
const app = new Koa();
const router = new Router();

app.proxy = true; // true 일때 proxy 헤더들을 신뢰함

app
.use(logger('./log/'))
.use(bodyParser())
.use(jwtMiddleware)
.use(cors({
  origin: NODE_ENV === "DEVELOPMENT" ? "http://localhost:3000" : "https://soojeonghan.com",
  exposeHeaders: 'lastpage, access_token',
  credentials: true,
}))
.use(ipFilter({
  id: ['45.146.164.125', '13.82.198.192'],
  forbidden: '403: Get out of here!',
  strict: NODE_ENV === "DEVELOPMENT" ? false : true,
}))
.use(router.routes())
.use(router.allowedMethods())

router.use('/api', api.routes());

if(NODE_ENV === "DEVELOPMENT") {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  })
} 
else { 
  https.createServer({
    ca: fs.readFileSync('/etc/letsencrypt/live/soojeonghan.shop/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/soojeonghan.shop/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/soojeonghan.shop/cert.pem')
  }, app.callback()).listen(port, () => {
    console.log(`${DOMAIN} Server Start`);
  });
}