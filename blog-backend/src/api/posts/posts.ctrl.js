const Post = require("models/post");
const Joi = require("joi");
const { ObjectId } = require('mongoose').Types;
const { verifyToken } = require('../../lib/token');


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
    tags: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
  })

  const result = schema.validate(ctx.request.body);

  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const {title, body, tags, category} = ctx.request.body;
  
  const post = new Post({
    title, body, tags, category,
    publishedDate: new Date(),
  });

  try {
    await post.save();
    ctx.body = post;
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.list = async(ctx) => {
  
  const page = parseInt(ctx.query.page || 1, 10);
  
  const { tag, category, search } = ctx.query;
  console.log(tag, category, search);
  // tag 존재 유무에 따라 find 함수에 넣을 파라미터
  const query = tag 
    ? {tags : tag}
    // tag가 undefined일 경우 빈 객체를 전달해서 아무런 데이터가 나타나지 않는 경우를 방지한다.
      : category 
        ? {category: {$regex: category, $options: 'i'}}
        : search
          ? {title: {$regex: search, $options: 'i'}}
          : {};
      
  if(page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find(query)
      .sort({publishedDate: -1})
      .limit(10)
      .skip((page-1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    
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
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.update = async(ctx) => {
  const {id} = ctx.params;
  const updatePost = {
    ...ctx.request.body,
    updatedDate: new Date(),
  }
  try {
    const post = await Post.findByIdAndUpdate(id, updatePost, {
      new: true
    }).exec();
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.search = async (ctx) => {
  const { search } = ctx.query;
  
  const query = search 
  ? {title : {$regex: search, $options: 'i'}}
  : {};

  try {
    // _id는 default라 [true/false] 처리하고, 필요한 데이터인 title만 가져온다.
    const posts = await Post.find(query, {"_id": true, "title": true})
      .lean()
      .exec();
    ctx.body = posts;
  }
  catch(e) {
    ctx.throw(e, 500);
  }
}

exports.checkLogin = async (ctx, next) => {
  const isCorrectToken = await verifyToken(ctx);
  if(isCorrectToken) {
    return next();
  }
  else {
    ctx.status = 403;
  }
}