const {ADMIN_PASS: adminPass, NODE_ENV} = process.env;

const { generateToken, verifyToken } = require('../../lib/token');

exports.login = async (ctx) => {
  const {password} = ctx.request.body;
  const freshToken = await generateToken({_id: 'soojeongHan', profile: 'development'});
  if(adminPass === password) {

    const cookieOptions = Object.assign({
      maxAge: 1000 * 30 * 60 * 60 * 24 * 3,
    }, NODE_ENV === 'DEVELOPMENT' ? {} : {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });

    ctx.cookies.set('access_token', freshToken, cookieOptions);
    ctx.body = {
      success: true
    };
  }
  else {
    ctx.body = {
      success: false
    };
  }
}

exports.check = async (ctx) => {
  try {
    const isCorrectToken = await verifyToken(ctx);
    ctx.body = {
      logged: isCorrectToken ? true : false
    };
  }
  catch {
    ctx.body = {
      logged: false
    }    
  }
  finally {
    ctx.status = 200;
  }
}

exports.logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
}