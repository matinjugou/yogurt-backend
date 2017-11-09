const jwt = require('jsonwebtoken');
module.exports = (options, app) => {
  return (ctx, next) => {
    const token = this.get();
    let decoded = jwt.verify(token, options.secretID);
    console.log('decoded=', decoded);
    // TODO:fullfill verify and ex logic of jsonwebtoken
    return next();
  };
};
