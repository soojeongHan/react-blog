const Router = require("koa-router");
const postsCtrl = require("./posts.ctrl");

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.get('/search/:content', postsCtrl.search);
posts.get('/:id', postsCtrl.isValidObjectId, postsCtrl.read);

// 인증 X
posts.post('/', postsCtrl.write);
posts.delete('/:id', postsCtrl.isValidObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.isValidObjectId, postsCtrl.update);

// 인증 O
// posts.post('/', postsCtrl.checkLogin, postsCtrl.write);
// posts.delete('/:id', postsCtrl.checkLogin, postsCtrl.isValidObjectId, postsCtrl.remove);
// posts.patch('/:id', postsCtrl.checkLogin, postsCtrl.isValidObjectId, postsCtrl.update);

module.exports = posts;