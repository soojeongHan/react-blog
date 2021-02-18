const Post = require("models/post");
const Joi = require("joi");
const {ObjectId} = require('mongoose').Types;

const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  
  fg: {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
      crimson: "\x1b[38m" // Scarlet
  },
  bg: {
      black: "\x1b[40m",
      red: "\x1b[41m",
      green: "\x1b[42m",
      yellow: "\x1b[43m",
      blue: "\x1b[44m",
      magenta: "\x1b[45m",
      cyan: "\x1b[46m",
      white: "\x1b[47m",
      crimson: "\x1b[48m"
  }
};

exports.isValidObjectId = (ctx,next) => {
  const {id} = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 404;
    return null;
  }
  return next();
}

exports.write = async(ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  })

  const result = schema.validate(ctx.request.body);

  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const {title, body, tags} = ctx.request.body;
  
  const post = new Post({
    title, body, tags
  });

  try {
    await post.save();
    ctx.body = post;
    console.log(colours.bg.white, colours.fg.black, "Success - Write Post", colours.reset);
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.list = async(ctx) => {
  const page = parseInt(ctx.query.page || 1, 10);
  const { tag } = ctx.query;

  // tag 존재 유무에 따라 find 함수에 넣을 파라미터
  const query = tag 
    ? {tags : tag}
    // tag가 undefined일 경우 빈 객체를 전달해서 아무런 데이터가 나타나지 않는 경우를 방지한다.
    : {};

  if(page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find(query)
      .sort({_id: -1})
      .limit(10)
      .skip((page-1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments().exec();
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 200
        ? post.body
        : `${post.body.slice(0, 200)}...`
    });
    ctx.set({
      lastPage: Math.ceil(postCount/10)
    })
    ctx.body = posts.map(limitBodyLength);
    console.log(colours.bg.white, colours.fg.black, "Success - List", colours.reset);
  }
  catch(e) {
    ctx.throw(e, 500);
  }
}

exports.read = async(ctx) => {
  const {id} = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if(!post) {
      ctx.body = 404;
      return;
    }
    ctx.body = post;
    console.log(colours.bg.white, colours.fg.black, "Success - Read", colours.reset);
  }
  catch(e) {
    ctx.throw(e, 500);
  }
}

exports.remove = async(ctx) => {
  const {id} = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
    console.log(colours.bg.white, colours.fg.black, "Success - Remove", colours.reset);
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.update = async(ctx) => {
  const {id} = ctx.params;
  const updatePost = {
    ...ctx.request.body,
    publishedDate: new Date(),
  }
  try {
    const post = await Post.findByIdAndUpdate(id, updatePost, {
      new: true
    }).exec();
    console.log(post);
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
    console.log(colours.bg.white, colours.fg.black, "Success - Update", colours.reset);
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.checkLogin = (ctx, next) => {
  if(!ctx.session.logged) {
    ctx.status = 401; // Unauthorized
    return null;
  }
  return next();
}