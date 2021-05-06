const jwtSecret = `${process.env.JWT_SECRET}`;
const id = `${process.env.ADMIN_ID}`;
const jwt = require('jsonwebtoken');

//JWT 토큰 생성
exports.generateToken = (payload) => {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                jwtSecret,
                {
                    expiresIn: '3d'
                }, (error, token) => {
                    if(error) reject(error);
                    resolve(token);
                }
            );
        }
    );
};

// JWT 디코딩
function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (error, decoded) => {
                if(error) reject(error);
                resolve(decoded);
            });
        }
    );
}

exports.verifyToken = async (ctx) => {
  const token = ctx.cookies.get('access_token');

  try {
    // 현재는 관리자 아이디밖에 없기 때문에 아래와 같이 처리한다.
    const { _id } = await jwt.verify(token, jwtSecret);
    return _id === id ? true : false;
  }
  catch(e) {
    throw new Error(e);
  }
}

// JWT 처리 미들웨어
exports.jwtMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get('access_token');

    if(!token) return next();

    try {
        const decoded = await decodeToken(token);
        if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
            const { _id, profile } = decoded;
            const freshToken = await generateToken({ _id, profile }, 'account');
            
            const cookieOptions = Object.assign({
                maxAge: 1000 * 30 * 60 * 60 * 24 * 3,
            }, process.env.NODE_ENV === 'DEVELOPMENT' ? {} : {
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });

            ctx.cookies.set('access_token', freshToken, cookieOptions);
        }
        ctx.request.user = decoded;
    } catch (e) {
        ctx.request.user = null;
    }

    return next();
};
