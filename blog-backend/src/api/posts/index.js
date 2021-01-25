const Router = require("koa-router");
const postsCtrl = require("./posts.ctrl");

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.isValidObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.isValidObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.isValidObjectId, postsCtrl.update);

module.exports = posts;