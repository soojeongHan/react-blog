require('dotenv').config();
// Library
const fs = require('fs');
const Koa = require("koa");
const https = require('https');
const Router = require("koa-router");
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const cors = require("@koa/cors");

const mongoose = require("mongoose");

const api = require("./api");

const {
  PORT: port = 5000, // 값이 없으면 Default Value = 5000;
  MONGO_URI,
  COOKIE_SIGN_KEY: signKey,
  NODE_ENV,
  MONGO_URI_DEV,
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정 
mongoose.connect(NODE_ENV === "DEVELOPMENT" ? MONGO_URI_DEV : MONGO_URI, {
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

const sessionConfig = {
  maxAge: 86400000, // 86400000 : 1 day, 60000 : 1분
  sameSite: "none"
}
app.proxy = true; // true 일때 proxy 헤더들을 신뢰함

app
.use(session(sessionConfig, app))
.use(bodyParser())
.use(cors({
    origin: NODE_ENV === "DEVELOPMENT" ? "http://localhost:3000" : "https://soojeonghan.com",
    exposeHeaders: 'lastpage',
    credentials: true,
  }))
  .use(router.routes()).use(router.allowedMethods());
app.keys = [signKey]; 
  
router.use('/api', api.routes());

if(NODE_ENV === "DEVELOPMENT") {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
  })
} else {
  https.createServer({
    ca: fs.readFileSync('/etc/letsencrypt/live/soojeonghan.gq/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/soojeonghan.gq/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/soojeonghan.gq/cert.pem')
  }, app.callback()).listen(port, () => {
    console.log("origin : " + NODE_ENV === "DEVELOPMENT" ? "http://172.18.224.1:3000" : "https://soojeonghan.com");
    console.log("https server start");
  });
}