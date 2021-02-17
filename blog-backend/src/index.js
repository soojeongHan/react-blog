require('dotenv').config();
// Library
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const mongoose = require("mongoose");
const cors = require("@koa/cors");

const api = require("./api");

const {
  PORT: port = 4000, // 값이 없으면 Default Value = 4000;
  MONGO_URI,
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정 
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(
  console.log('connected to mongodb')
).catch(e => 
  console.error(e)
);

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(cors({
  origin: "http://localhost:3000",
  exposeHeaders: 'lastpage'
}));

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("Server Start");
  console.log(`http://localhost:${port}/`)
})

