const Base = require('../../rest.js');
const jwt = require('jsonwebtoken');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }

  getAction() {
    const userId = this.get('userId');
    const token = this.get('token');
    const self = this;
    jwt.verify(token, this.config('secretKey'), function(err, decode) {
      if (err) {
        return self.success({
          code: 1,
          msg: 'Invalid token'
        });
      } else {
        if (decode.userId !== userId) {
          return self.success({
            code: 2,
            msg: 'Info mismatch!'
          });
        }
        return self.success({
          code: 0,
          msg: 'Correct token'
        });
      }
    });
  }

  async postAction() {
    const userId = this.post('userId');
    const token = jwt.sign({userId: userId}, this.config('secretKey'));
    return this.success({
      code: 0,
      msg: 'Login successful!',
      token: token
    });
  }
};
