const {ADMIN_PASS: adminPass} = process.env;
const colours = require('../style');

exports.login = async (ctx) => {
  const {password} = ctx.request.body;
  
  if(adminPass === password) {
    console.log(colours.bg.white, colours.fg.blue, "Success - Login", colours.reset);
    ctx.body = {
      success: true
    };
    ctx.session.logged = true;
    console.dir(ctx.session.logged);
  }
  else {
    console.log(colours.bg.black, colours.fg.red, "Fail - Login", colours.reset);
    console.dir(ctx.session.logged);
    ctx.body = {
      success: false
    };
  }
}

exports.check = (ctx) => {
  console.dir(ctx.session.logged);
  ctx.body = {
    logged: !!ctx.session.logged
  };
}

exports.logout = (ctx) => {
  console.dir(ctx.session.logged);
  ctx.session = null;
  ctx.status = 204; // No Content
}