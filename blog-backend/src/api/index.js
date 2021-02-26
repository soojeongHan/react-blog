const Router = require("koa-router");
const posts = require("./posts");
const auth = require('./auth');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());

module.exports = api;