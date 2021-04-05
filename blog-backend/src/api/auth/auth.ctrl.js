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
    console.log(ctx.session);
  }
  else {
    console.log(colours.bg.black, colours.fg.red, "Fail - Login", colours.reset);
    ctx.body = {
      success: false
    };
  }
}

exports.check = (ctx) => {
  ctx.body = {
    logged: !!ctx.session.logged
  };
}

exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status = 204; // No Content
}