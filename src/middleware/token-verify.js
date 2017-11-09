const jwt = require('jsonwebtoken');
module.exports = (options, app) => {
  return (ctx, next) => {
    const token = this.get();
    // const decoded = jwt.verify(token, options.secretID);
    // TODO:fullfill verify and ex logic of jsonwebtoken
    return next();
  };
};
