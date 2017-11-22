const jwt = require('jsonwebtoken');
module.exports = (options, app) => {
  return (ctx, next) => {
    // TODO:fullfill verify and ex logic of jsonwebtoken
    if (ctx.originalUrl.indexOf('login') === -1) {
      const token = this.get();
      try {
        const decoded = jwt.verify(token, ctx.config('secretKey'));
        const userId = this.get();
        const staffId = this.get();
        let flag = false;
        if (userId) {
          if (decoded.userId === userId) {
            flag = true;
          }
        } else if (staffId) {
          if (decoded.staffId !== staffId) {
            flag = true;
          }
        }
        if (!flag) {
          ctx.throw('Invalid token!', 403);
        }
      } catch (err) {
        ctx.throw('Invalid token!', 403);
      }
      // console.log(token);
    }
    return next();
  };
};
